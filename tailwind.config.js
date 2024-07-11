/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/svhighlight/**/*.svelte"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        grotesk: ['Space Grotesk']
      }
    },
  },
  plugins: [],
}

