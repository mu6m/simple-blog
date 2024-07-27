import { formatDate, list } from '$lib/helpers/controllers/post';

export async function load({ locals, url }: any) {
	let search_text = url.searchParams.get('q') || '';
	const posts = await list(1, search_text);
	for (let post of posts) {
		(post as any).date = formatDate(post.createdAt.toString());
	}
	return {
		search_text,
		posts
	};
}
