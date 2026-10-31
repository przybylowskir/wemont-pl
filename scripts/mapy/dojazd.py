import json, sys, math
sys.path.insert(0, sys.argv[3])
from osm_svg import Proj, poly_d, path_d
from shapely.geometry import LineString, Polygon, box

d = json.load(open(sys.argv[1]))['elements']
CEL_ID = 244255585            # budynek z adresem Henryka Sienkiewicza 19 (Nominatim, 31.10.2026) - salon Wemont
lon0, lat0 = 15.54838, 54.16611
W, H = 1600, 1000
span = 0.0095
P = Proj(lon0 - span/2, 0, lon0 + span/2, 1, W)   # tymczasowo, do wyliczenia skali
# dobór szerokości geograficznych tak, żeby kadr miał 16:10 i środek w budynku
from osm_svg import merc
_, ym = merc(lon0, lat0)
half = (span * H / W) / 2
def inv(y): return math.degrees(2*math.atan(math.exp(math.radians(y))) - math.pi/2)
P = Proj(lon0 - span/2, inv(ym - half*1.0 + half*0.1), lon0 + span/2, inv(ym + half + half*0.1), W)
frame = box(0, 0, P.width, P.height)

def geom(e, closed):
    pts = [P(g['lon'], g['lat']) for g in e['geometry']]
    if closed and len(pts) >= 4:
        return Polygon(pts).buffer(0).intersection(frame)
    return LineString(pts).intersection(frame) if len(pts) > 1 else None

C = dict(tlo='#f4f4f1', ziel='#e2ebe4', bud='#e1e1dc', bud_kreska='#cbcbc5', parking='#ebebe7',
         droga='#ffffff', obrys='#cfcfc9', tor='#a9a9a4', cel='#018455', tekst='#1d1d1b', ulica='#55554f')
out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {P.width} {P.height}" role="img" aria-labelledby="mapa-dojazd-tytul">',
       '<title id="mapa-dojazd-tytul">Mapa dojazdu do siedziby Wemont: ul. Jasna 15 w Kołobrzegu.</title>',
       f'<rect width="{P.width}" height="{P.height}" fill="{C["tlo"]}"/>']

def polys(pred, fill, stroke=None):
    for e in d:
        t = e.get('tags', {})
        if e['id'] == CEL_ID or not pred(t): continue
        g = geom(e, True)
        if not g or g.is_empty: continue
        for part in getattr(g, 'geoms', [g]):
            if part.geom_type != 'Polygon': continue
            s = f' stroke="{stroke}" stroke-width="1"' if stroke else ''
            out.append(f'<path d="{poly_d(part)}" fill="{fill}"{s}/>')

polys(lambda t: t.get('landuse') in ('grass', 'forest', 'meadow') or t.get('leisure') == 'park' or t.get('natural') in ('wood', 'scrub'), C['ziel'])
polys(lambda t: t.get('amenity') == 'parking', C['parking'])
polys(lambda t: 'building' in t, C['bud'], C['bud_kreska'])

szer = {'motorway': 22, 'trunk': 22, 'primary': 20, 'secondary': 18, 'tertiary': 15, 'unclassified': 12,
        'residential': 12, 'living_street': 10, 'service': 6}
drogi = []
for e in d:
    t = e.get('tags', {})
    hw = t.get('highway', '')
    base = hw.replace('_link', '')
    if base not in szer: continue
    if hw == 'service' and t.get('service') in ('parking_aisle', 'driveway'): w = 4
    else: w = szer[base]
    g = geom(e, False)
    if not g or g.is_empty: continue
    for part in getattr(g, 'geoms', [g]):
        if part.geom_type == 'LineString':
            drogi.append((w, path_d(part.coords), t.get('name'), part))
for w, dd, _, _ in sorted(drogi, key=lambda x: x[0]):
    out.append(f'<path d="{dd}" fill="none" stroke="{C["obrys"]}" stroke-width="{w+3}" stroke-linecap="round" stroke-linejoin="round"/>')
for w, dd, _, _ in sorted(drogi, key=lambda x: x[0]):
    out.append(f'<path d="{dd}" fill="none" stroke="{C["droga"]}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')

for e in d:
    if e.get('tags', {}).get('railway') != 'rail': continue
    g = geom(e, False)
    if not g or g.is_empty: continue
    for part in getattr(g, 'geoms', [g]):
        if part.geom_type == 'LineString':
            out.append(f'<path d="{path_d(part.coords)}" fill="none" stroke="{C["tor"]}" stroke-width="3" stroke-dasharray="14 8"/>')

# nazwy ulic: najdłuższy odcinek każdej nazwanej ulicy, tekst wzdłuż linii
nazwy = {}
for w, dd, name, part in drogi:
    if not name or w < 10: continue
    if name not in nazwy or part.length > nazwy[name].length:
        nazwy[name] = part
# rozmiary dobrane pod telefon (360 px): mapa jest tam pomniejszona ok. 5×
FS_ULICA, FS_NAZWA, FS_ADRES, FS_OSM = 30, 64, 40, 26
def szer_tekstu(t, fs): return len(t) * fs * 0.62   # przybliżenie dla Montserrat

cel = next(e for e in d if e['id'] == CEL_ID)
cp = Polygon([P(g['lon'], g['lat']) for g in cel['geometry']])
x, y = cp.centroid.x, cp.centroid.y
r = 40; h = r * 2.6
def lab(sw): return f'font-family="&apos;Montserrat Variable&apos;, Montserrat, Arial, sans-serif" paint-order="stroke" stroke="#ffffff" stroke-width="{sw}" stroke-linejoin="round"'
NAZWA, ADRES = 'WEMONT', 'ul. Sienkiewicza 19'
szer = max(szer_tekstu(NAZWA, FS_NAZWA), szer_tekstu(ADRES, FS_ADRES))
margines = 24
if x + r + 28 + szer <= P.width - margines:      # podpis na prawo od pinezki
    tx, kotwica, ty = x + r + 28, 'start', y - h + r - 8
elif x - r - 28 - szer >= margines:              # na lewo
    tx, kotwica, ty = x - r - 28, 'end', y - h + r - 8
else:                                            # nad pinezką, wyśrodkowany, w granicach kadru
    tx = min(max(x, margines + szer / 2), P.width - margines - szer / 2)
    kotwica, ty = 'middle', y - h - FS_ADRES - 24
# pinezka z podpisem — nazwy ulic trzymamy od niej z daleka
if kotwica == 'start': x0, x1 = x - r, tx + szer
elif kotwica == 'end': x0, x1 = tx - szer, x + r
else: x0, x1 = tx - szer / 2, tx + szer / 2
zajete = box(x0, ty - FS_NAZWA, x1, max(y, ty + 48))

defs, teksty = [], []
for i, (name, part) in enumerate(nazwy.items()):
    if part.length < max(220, szer_tekstu(name, FS_ULICA) + 60): continue
    cs = list(part.simplify(3).coords)
    if cs[0][0] > cs[-1][0]: cs = cs[::-1]
    linia = LineString(cs)
    pol = szer_tekstu(name, FS_ULICA) / 2 + 20
    kandydaci = [pol + k * 10 for k in range(int((linia.length - 2 * pol) // 10) + 1)] or [linia.length / 2]
    def odstep(c): return min(linia.interpolate(c + dd).distance(zajete) for dd in (-pol, 0, pol))
    srodek = max(kandydaci, key=odstep)
    defs.append(f'<path id="ul{i}" d="{path_d(cs)}"/>')
    teksty.append(f'<text font-family="&apos;Montserrat Variable&apos;, Montserrat, Arial, sans-serif" font-size="{FS_ULICA}" font-weight="600" fill="{C["ulica"]}" dy="10" paint-order="stroke" stroke="#ffffff" stroke-width="9" stroke-linejoin="round"><textPath href="#ul{i}" startOffset="{srodek:.0f}" text-anchor="middle">{name}</textPath></text>')
out.append('<defs>' + ''.join(defs) + '</defs>')

out.append(f'<path d="{poly_d(cp)}" fill="{C["cel"]}" stroke="#0d3529" stroke-width="2"/>')
out += teksty

out.append(f'<path d="M{x:.1f},{y:.1f} C{x-r*0.4:.1f},{y-r*0.9:.1f} {x-r:.1f},{y-h+r*1.2:.1f} {x-r:.1f},{y-h+r:.1f} A{r},{r} 0 1 1 {x+r:.1f},{y-h+r:.1f} C{x+r:.1f},{y-h+r*1.2:.1f} {x+r*0.4:.1f},{y-r*0.9:.1f} {x:.1f},{y:.1f}Z" fill="#0d3529" stroke="#ffffff" stroke-width="5"/>')
out.append(f'<circle cx="{x:.1f}" cy="{y-h+r:.1f}" r="15" fill="#ffffff"/>')
out.append(f'<text x="{tx:.0f}" y="{ty:.0f}" font-size="{FS_NAZWA}" font-weight="700" fill="#0d3529" text-anchor="{kotwica}" {lab(11)}>{NAZWA}</text>')
out.append(f'<text x="{tx:.0f}" y="{ty + 48:.0f}" font-size="{FS_ADRES}" font-weight="500" fill="{C["tekst"]}" text-anchor="{kotwica}" {lab(11)}>{ADRES}</text>')
out.append(f'<text x="{P.width-18}" y="{P.height-18}" font-size="{FS_OSM}" fill="#4a4a4a" text-anchor="end" {lab(9)}>© autorzy OpenStreetMap</text>')
out.append('</svg>')
open(sys.argv[2], 'w').write('\n'.join(out))
print(P.width, P.height, sorted(nazwy), 'podpis:', kotwica, round(tx), round(ty))
