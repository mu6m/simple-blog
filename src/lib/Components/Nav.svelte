<script>
	import { goto } from '$app/navigation';

	let search = false;
	let search_text = '';
</script>

<nav class="w-full max-w-3xl mx-auto py-7 px-5">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="font-bold text-xl"><a href="/">Ledraa</a></h2>
		</div>
		<button
			on:click={() => {
				search = !search;
			}}
			class="btn bg-gray-300 text-sm font-medium cursor-pointer rounded-full"
		>
			{#if search}
				<svg width="15" height="20" viewBox="0 0 20 20"
					><path
						d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
						stroke="currentColor"
						fill="none"
						fill-rule="evenodd"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path></svg
				>
			{:else}
				<svg
					class="h-4 w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			{/if}

			<span class="sr-only">Search</span>
		</button>
	</div>
	{#if search}
		<div class="w-full flex my-4 gap-4">
			<input
				bind:value={search_text}
				type="text"
				placeholder="Search Text..."
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			/>
			<button
				class="btn bg-gray-300 rounded-lg w-32"
				on:click={async () => {
					await goto(`/?q=${search_text}`);
					search = !search;
				}}>Search</button
			>
		</div>
	{/if}
</nav>
