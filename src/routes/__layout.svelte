<script>
	import Header from '$lib/header/Header.svelte';
	import SideBar from '$lib/sideBar/SideBar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';
	import { createClient, setClient } from '@urql/svelte';
	import { writable } from 'svelte/store';

	const client = createClient({
		url: 'http://tiztap.tatar/graphql/',
	});
	setClient(client);

	export let store = writable(null);
</script>

<Header />
<div id="wrapper" style="margin-top: 55px">
	<SideBar />
	<div id="content-wrapper">
		<slot />
<!--		<Footer />-->
	</div>
</div>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
