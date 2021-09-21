/** @type {import('@sveltejs/kit').Config} */
import node from '@sveltejs/adapter-node'
// import adapter from '@sveltejs/adapter-static';
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			optimizeDeps: {
				exclude: ['@urql/svelte'],
			}
		},
		adapter: node(),
	}
};

export default config;
