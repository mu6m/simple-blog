import { formatDate, list } from '$lib/helpers/controllers/post';
import { json } from '@sveltejs/kit';

export async function POST({ request }: any) {
	const { page, text } = await request.json();
	const posts = await list(page, text);
	for (let post of posts) {
		(post as any).date = formatDate(post.createdAt.toString());
	}
	return json({ posts });
}
