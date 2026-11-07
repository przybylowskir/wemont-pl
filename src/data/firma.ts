// Dane firmy - jedno źródło dla treści i stopki.
// Stan z obecnej wemont.pl (Framer, /kontakt i stopka, 31.10.2026). Robert 31.10: „Dane kontaktowe na wemont.pl są właściwe”.
// Uwaga: bramykolobrzeg.pl ma inne dane (adres Jasna 15) - to osobna strona, nie kopiuj stamtąd.
// Wyjątek: godziny 9:00-16:00 - od 07.11.2026 te same na obu stronach (Robert, za wizytówkami Google).

export const firma = {
	nazwa: 'Wemont',
	podtytul: 'Salon Partnerski Wiśniowski',
	adres: {
		ulica: 'ul. Henryka Sienkiewicza 19', // w nagłówku strony skrót: ul. H. Sienkiewicza 19
		kod: '78-100',
		miasto: 'Kołobrzeg',
		kraj: 'PL',
	},
	godziny: [
		'Poniedziałek - Piątek: 09:00 - 16:00', // Robert 07.11.2026: tak podają obie wizytówki Wemont w Google (Framer miał 08:00)
		'Sobota - umówmy się telefonicznie',
		'Niedziela - odpoczywamy',
	],
	telefony: [
		{ osoba: 'Mirek', wyswietlany: '+48-608-718-597', href: 'tel:+48608718597' },
		{ osoba: 'Wojtek', wyswietlany: '+48-660-235-515', href: 'tel:+48660235515' },
	],
	emailBiuro: 'biuro@wemont.pl',
	emailSprzedaz: 'sprzedaz@wemont.pl',
	nip: '6711861917',
	regon: '52873231000000', // jak w polityce prywatności na Framerze
	// Kanoniczny adres tej strony (z www, jak na Framerze).
	www: 'https://www.wemont.pl',
	// Strona o szlabanach i automatyce (osobne repo wemont-strona).
	bramyKolobrzeg: 'https://bramykolobrzeg.pl/',
};
