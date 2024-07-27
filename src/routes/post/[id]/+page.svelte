<script lang="ts">
	import { page } from '$app/stores';
</script>

<article class="w-full px-2 flex flex-col gap-4 max-w-2xl mx-auto">
	<h1 class="my-2 text-3xl font-bold">{$page.data.post.title}</h1>
	<img src={$page.data.post.thumbnail} alt={$page.data.post.title} class="w-full object-cover" />
	<p class="text-sm">{$page.data.post.description}</p>
	<p class="text-sm">
		{$page.data.date}
	</p>
	<div class="w-full py-3 px-3 flex flex-col gap-7 mt-12 post">
		{@html $page.data.post_html}
	</div>
</article>
