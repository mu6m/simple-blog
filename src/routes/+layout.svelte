<script>
	import '../app.css';
	import Nav from '$lib/Components/Nav.svelte';
</script>

<div class="w-full max-w-5xl flex flex-col items-center mx-auto">
	<Nav />

	<main class="min-h-96 my-10">
		<slot />
	</main>

	<footer class="py-4 text-center">
		<p>{new Date().getFullYear()}</p>
	</footer>
</div>
