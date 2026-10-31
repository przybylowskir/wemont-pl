// robots.txt: produkcja wpuszcza wszystkich, podgląd (PUBLIC_PODGLAD=1) blokuje wszystko.
import type { APIRoute } from 'astro';

const produkcja = `User-agent: *
Allow: /

Sitemap: https://www.wemont.pl/sitemap-index.xml
`;

const podglad = `User-agent: *
Disallow: /
`;

export const GET: APIRoute = () =>
	new Response(import.meta.env.PUBLIC_PODGLAD === '1' ? podglad : produkcja, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
