import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['robots.txt'],
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'pwa-shell',
				short_name: 'pwa-shell',
				description: 'starting point for pwa apps.',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#0b0f1a',
				background_color: '#0b0f1a',
				orientation: 'any',
				icons: [
					{
						src: '/icons/pwa-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/pwa-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/pwa-maskable-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		})
	]
});
