// Karuzela na przewijanym torze (scroll-snap): strzałki + autoprzewijanie w pętli do przodu.
// Używają jej slider zdjęć i opinie na stronie głównej - jak na Framerze (odczyt 07.11.2026).
// Pauza pod kursorem myszy, przy fokusie z klawiatury i na karcie w tle;
// bez autoprzewijania przy systemowym „ogranicz ruch”.
//
// Oczekiwany układ: korzeń z [data-slajdy] (tor), [data-wstecz] i [data-dalej].
export function karuzela(korzen: HTMLElement, odstep: number) {
	const tor = korzen.querySelector<HTMLElement>('[data-slajdy]')!;
	if (tor.children.length < 2) return;

	// Kopia pierwszego slajdu na końcu: z ostatniego przewijamy płynnie na kopię,
	// potem bez animacji wracamy na prawdziwy początek. Pętla zawsze w przód.
	const kopia = tor.firstElementChild!.cloneNode(true) as HTMLElement;
	kopia.setAttribute('aria-hidden', 'true');
	kopia.removeAttribute('fetchpriority');
	if (kopia instanceof HTMLImageElement) kopia.loading = 'lazy';
	tor.append(kopia);
	const ile = tor.children.length - 1; // bez kopii

	const indeks = () => Math.round(tor.scrollLeft / tor.clientWidth);
	const idz = (i: number, plynnie = true) =>
		tor.scrollTo({ left: i * tor.clientWidth, behavior: plynnie ? 'smooth' : 'instant' });

	// Po zatrzymaniu na kopii - skok na początek bez animacji.
	let koniec = 0;
	tor.addEventListener('scroll', () => {
		clearTimeout(koniec);
		koniec = window.setTimeout(() => {
			if (indeks() >= ile) idz(0, false);
		}, 150);
	});

	const dalej = () => {
		const i = indeks();
		if (i >= ile) {
			idz(0, false);
			requestAnimationFrame(() => idz(1));
		} else idz(i + 1);
	};
	const wstecz = () => {
		const i = indeks();
		if (i <= 0) {
			idz(ile, false);
			requestAnimationFrame(() => idz(ile - 1));
		} else idz(i - 1);
	};

	const ruchOgraniczony = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let mysz = false;
	let klawiatura = false;
	let zegar = 0;
	const start = () => {
		clearInterval(zegar);
		if (ruchOgraniczony) return;
		zegar = window.setInterval(() => {
			if (!mysz && !klawiatura && !document.hidden) dalej();
		}, odstep);
	};

	korzen.querySelector('[data-dalej]')?.addEventListener('click', () => { dalej(); start(); });
	korzen.querySelector('[data-wstecz]')?.addEventListener('click', () => { wstecz(); start(); });
	korzen.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') mysz = true; });
	korzen.addEventListener('pointerleave', () => (mysz = false));
	korzen.addEventListener('focusin', () => (klawiatura = !!korzen.querySelector(':focus-visible')));
	korzen.addEventListener('focusout', () => (klawiatura = false));
	start();
}
