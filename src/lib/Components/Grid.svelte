<script lang="ts">
	import viewport from '$lib/Components/useView';
	export let load_more;
	export let posts;

	let loading = false;
	let has_more = true;
</script>

{#if posts.length == 0}
	<h1 class="text-xl text-center font-bold">there are no posts!</h1>
{/if}
<div class="px-3 my-4 max-w-2xl w-full flex flex-col gap-6">
	{#each posts as post}
		<div
			class="w-full flex flex-col-reverse md:flex-row mx-auto hover:underline justify-between hover:cursor-pointer gap-4"
		>
			<div class={`py-3 px-3`}>
				<a href={`/post/${post.slug}`} class="flex justify-between h-full flex-col gap-2">
					<h1 class="text-md font-bold">{post.title}</h1>
					<p class="line-clamp-3 text-xs">
						{post.description}
					</p>
					<p class="text-xs">
						{post.date}
					</p>
				</a>
			</div>
			<img src={post.thumbnail} alt={post.title} class="md:max-w-64 w-full h-auto object-cover" />
		</div>
	{/each}
</div>
{#if loading}
	<h1 class="text-md font-bold text-center">Loading ...</h1>
{/if}
{#if posts.length > 0}
	{#if !has_more}
		<h1 class="text-md font-bold text-center">there are no more posts!</h1>
	{:else}
		<div
			use:viewport
			class="w-0"
			on:enterViewport={async () => {
				loading = true;
				if (loading && has_more) {
					has_more = await load_more();
				}
				loading = false;
			}}
		></div>
	{/if}
{/if}
