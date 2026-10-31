// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Adresy jak na Framerze (31.10.2026): z www, bez slasha na końcu (/oferta, /d-bramy).
	// Google zna stronę pod tymi adresami - po przeniesieniu nie mogą się zmienić.
	site: 'https://www.wemont.pl',
	trailingSlash: 'never',
	build: {
		// oferta.html zamiast oferta/index.html - .htaccess podaje go pod /oferta.
		format: 'file',
		inlineStylesheets: 'always',
	},
	integrations: [sitemap()],
});
