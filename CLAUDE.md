# CLAUDE.md — wemont.pl (Wemont)

Główna strona firmy Wemont (Mirek Zieliński, Kołobrzeg): bramy, ogrodzenia,
drzwi i okna Wiśniowskiego. Wykonawca: Robert Przybyłowski.
Rozmawiamy po polsku. Teksty na stronie po polsku, z polskimi znakami.

Decyzje zapadają w sesji vaultu Roberta (notatka projektu `wemont-strona`,
rozpoznanie z 29.10.2026). Brakująca informacja → zgłoś Robertowi, nie zgaduj.

## Cel

Przenieść wemont.pl z Framera na seohost (ten sam pakiet co bramykolobrzeg.pl).
Termin publikacji: **najpóźniej 19.11.2026** — 20.11 roczna płatność za Framer.

## Zasady (Robert, 29.10.2026)

1. **Adresy podstron bez zmian.** Kanoniczny adres: `https://www.wemont.pl`,
   bez slasha na końcu (`/oferta`, `/d-bramy`). Tak podaje Framer
   i tak zna stronę Google. Obsługuje to `astro.config.mjs` + `public/.htaccess`.
2. **Wygląd nie musi być identyczny co do piksela.**
3. **Baner cookies easy.tools zostaje** — licencja lifetime Roberta, osadzony kod.
4. **Karty oferty to kod nulead od Wiśniowskiego** (`api.nulead.pl/layer.js?guid=…`,
   osobny guid na każdą z 8 podstron oferty). Osadzamy bez zmian.
5. **DNS:** zmieniamy tylko rekordy A i `www` (dziś Framer). MX, SPF, DKIM, DMARC
   i oba rekordy `google-site-verification` zostają nietknięte.

## Strony (sitemap Framera, 31.10.2026)

`/`, `/oferta`, `/onas`, `/kontakt`, `/politykaprywatnosci`, `/realizacje`, `/blog`,
`/d-bramy`, `/d-ogrodzenia`, `/d-drzwi`, `/d-okna`,
`/p-bramy`, `/p-ogrodzenia`, `/p-drzwi`, `/p-okna`.

`/blog`, `/realizacje` i 8 wpisów pod nimi to resztki szablonu Framera
(angielskie tytuły typu „from-vision-to-execution…”). **Nie przenosimy ich**
(Robert, 31.10.2026: „Zostały bo nie wiedziałem o ich istnieniu”).
Po przełączeniu odpowiadają 404 i wypadają z indeksu. Bez przekierowania
na stronę główną: Google traktuje takie przekierowanie jak miękkie 404.

## Dane firmy

`src/data/firma.ts` — stan z obecnej wemont.pl (31.10.2026), Robert:
dane kontaktowe na wemont.pl są właściwe. Salon: ul. Henryka Sienkiewicza 19,
78-100 Kołobrzeg; telefony Mirek 608 718 597, Wojtek 660 235 515;
biuro@ i sprzedaz@; godziny pn-pt 8:00-16:00. Nie kopiuj danych
z bramykolobrzeg.pl — tam są inne (Jasna 15, 9:00-16:00).

**Zamiast mapy Google — obrazek mapy**, jak na bramykolobrzeg.pl
(OpenStreetMap, skrypt `scripts/mapy/` w wemont-strona). Bez iframe Google.

**Bez Umami** — na razie odpuszczone (Robert, 31.10.2026).

## Wgrywanie

`scripts/wdroz.sh test|produkcja [--wyslij]` — jak w wemont-strona, cel
`domains/wemont.pl/public_html/`. Bez `--wyslij` tylko podgląd zmian.
Wersja test na seohost jest możliwa dopiero po przełączeniu DNS — do tego czasu
domena wskazuje na Framer, więc test robimy lokalnie i na podglądzie Cloudflare.
