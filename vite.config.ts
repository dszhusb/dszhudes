import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(), 
		enhancedImages(), 
		svelteTesting()
	],
	assetsInclude: ['**/*.glb'],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
	},
});
