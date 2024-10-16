import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), enhancedImages(), svelteTesting()],
	assetsInclude: ['**/*.glb'],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
	},
});
