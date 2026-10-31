// Podstrony oferty. Adresy i kody kart nulead (Wiśniowski) przepisane z Framera 31.10.2026.
// Treść kart pobiera skrypt nulead - nie edytujemy jej tutaj.

export type Pozycja = {
	slug: string;
	nazwa: string;
	grupa: 'dom' | 'firma';
	guid: string;
};

export const oferta: Pozycja[] = [
	{ slug: 'd-bramy', nazwa: 'Bramy garażowe', grupa: 'dom', guid: 'daf146ab-2a6f-4bca-8308-2e014037adf7' },
	{ slug: 'd-ogrodzenia', nazwa: 'Ogrodzenia', grupa: 'dom', guid: 'e2b61e9e-cb28-452e-8e7d-d443e69369d2' },
	{ slug: 'd-drzwi', nazwa: 'Drzwi', grupa: 'dom', guid: 'c4f4564f-ceb6-4d46-8909-5d17d1d791bd' },
	{ slug: 'd-okna', nazwa: 'Okna', grupa: 'dom', guid: '99c464f6-bcf2-4a8e-ac45-0b579e5212b9' },
	{ slug: 'p-bramy', nazwa: 'Bramy przemysłowe', grupa: 'firma', guid: 'c127e703-7ec2-49de-95aa-3aa187a776f7' },
	{ slug: 'p-ogrodzenia', nazwa: 'Ogrodzenia przemysłowe', grupa: 'firma', guid: 'eeae3fa7-0384-4204-80ac-ea45bc4834c7' },
	{ slug: 'p-drzwi', nazwa: 'Drzwi przemysłowe', grupa: 'firma', guid: '691c1281-57ef-49cd-980d-b5ef885d2668' },
	{ slug: 'p-okna', nazwa: 'Okna przemysłowe', grupa: 'firma', guid: '0989da0b-ebe7-4cda-9c93-585ddb77eefd' },
];
