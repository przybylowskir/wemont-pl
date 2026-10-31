#!/bin/bash
# Wgrywanie strony na seohost (konto srv71031, wpis "wemont" w ~/.ssh/config).
#
#   scripts/wdroz.sh test        - wersja próbna: noindex, robots blokuje wszystko
#   scripts/wdroz.sh produkcja   - wersja publiczna: wyszukiwarki wpuszczone
#
# Bez --wyslij skrypt tylko buduje i pokazuje, co by się zmieniło na serwerze (rsync --dry-run).
# Z --wyslij naprawdę wgrywa. Pliki *.shtml (strony błędów seohost) zostają na serwerze.
# Adres docelowy działa dopiero po przełączeniu DNS z Framera.
set -euo pipefail

TRYB="${1:-}"
WYSLIJ="${2:-}"
CEL="wemont:domains/wemont.pl/public_html/"
# Bez Umami: na razie odpuszczone (Robert 31.10.2026).

cd "$(dirname "$0")/.."

case "$TRYB" in
	test)
		export PUBLIC_PODGLAD=1
		;;
	produkcja)
		unset PUBLIC_PODGLAD
		;;
	*)
		echo "Użycie: scripts/wdroz.sh test|produkcja [--wyslij]" >&2
		exit 1
		;;
esac

if [ -n "$(git status --porcelain)" ]; then
	echo "W repozytorium są zmiany bez commita. Najpierw commit, żeby na serwerze była wersja z historii." >&2
	exit 1
fi

npm run build

# Kontrola wersji przed wysłaniem.
if [ "$TRYB" = produkcja ]; then
	grep -q 'noindex, nofollow' dist/index.html && { echo "BŁĄD: produkcja z noindex" >&2; exit 1; }
else
	grep -q 'noindex, nofollow' dist/index.html || { echo "BŁĄD: wersja próbna bez noindex" >&2; exit 1; }
fi

OPCJE=(-rlptz --delete --exclude '*.shtml' --itemize-changes -e ssh)
if [ "$WYSLIJ" = "--wyslij" ]; then
	rsync "${OPCJE[@]}" dist/ "$CEL"
	echo "Wgrane: $TRYB, commit $(git rev-parse --short HEAD)."
else
	rsync "${OPCJE[@]}" --dry-run dist/ "$CEL"
	echo "Tylko podgląd zmian (nic nie wysłano). Wgranie: scripts/wdroz.sh $TRYB --wyslij"
fi
