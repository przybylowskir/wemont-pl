"""Rysowanie map SVG z danych OSM (Overpass JSON). Dane: © autorzy OpenStreetMap, ODbL."""
import json, math
from shapely.geometry import LineString, box, Point, Polygon
from shapely.ops import unary_union, polygonize, linemerge

def merc(lon, lat):
    return lon, math.degrees(math.log(math.tan(math.pi/4 + math.radians(lat)/2)))

class Proj:
    def __init__(self, w, s, e, n, width):
        self.x0, self.y0 = merc(w, s); self.x1, self.y1 = merc(e, n)
        self.width = width
        self.k = width / (self.x1 - self.x0)
        self.height = round((self.y1 - self.y0) * self.k)
    def __call__(self, lon, lat):
        x, y = merc(lon, lat)
        return ((x - self.x0) * self.k, (self.y1 - y) * self.k)

def path_d(coords, close=False):
    pts = [f"{x:.1f},{y:.1f}" for x, y in coords]
    return "M" + "L".join(pts) + ("Z" if close else "")

def land_polygons(coast_ways, P, simplify=0.6, land_pt=None, sea_pt=None):
    """Zamknij linię brzegową w poligony lądu w obrębie kadru. Ląd jest po lewej stronie linii (konwencja OSM)."""
    frame = box(0, 0, P.width, P.height)
    lines = [LineString([P(g['lon'], g['lat']) for g in w['geometry']]) for w in coast_ways if len(w['geometry']) > 1]
    clipped = [l.intersection(frame) for l in lines]
    clipped = [c for c in clipped if not c.is_empty]
    faces = list(polygonize(unary_union([frame.boundary] + clipped)))
    segs = []
    for c in clipped:
        for part in getattr(c, 'geoms', [c]):
            cs = list(part.coords)
            segs += list(zip(cs, cs[1:]))
    land = []
    for f in faces:
        # punkty kontrolne rozstrzygają duże pola (ląd stały, otwarte morze)
        if land_pt is not None and f.contains(Point(P(*land_pt))):
            land.append(f.simplify(simplify)); continue
        if sea_pt is not None and f.contains(Point(P(*sea_pt))):
            continue
        p = f.representative_point()
        best, side = None, 0
        for (ax, ay), (bx, by) in segs:
            dx, dy = bx - ax, by - ay
            L = dx*dx + dy*dy
            if L == 0: continue
            t = max(0, min(1, ((p.x-ax)*dx + (p.y-ay)*dy) / L))
            qx, qy = ax + t*dx, ay + t*dy
            d = (p.x-qx)**2 + (p.y-qy)**2
            if best is None or d < best:
                # oś y w dół: „lewa” strona w OSM to cross < 0 w układzie ekranu
                best, side = d, (dx*(p.y-ay) - dy*(p.x-ax))
        if side < 0:
            land.append(f.simplify(simplify))
    return land

def poly_d(poly):
    d = path_d(poly.exterior.coords, True)
    for r in poly.interiors:
        d += path_d(r.coords, True)
    return d
