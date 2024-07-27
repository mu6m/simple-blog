<script>
	import { page } from '$app/stores';
	import Grid from '$lib/Components/Grid.svelte';
	import axios from 'axios';
	$: posts = $page.data.posts;
	let cur_page = 1;
	async function load_more() {
		cur_page += 1;
		const { data } = await axios.post('/', {
			page: cur_page,
			text: $page.data.search_text
		});
		posts = [...posts, ...data.posts];
		return data.posts > 0;
	}
</script>

<div class="w-full">
	<Grid {posts} {load_more} />
</div>
