import prisma from '$lib/helpers/prisma';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { formatDate } from '$lib/helpers/controllers/post';

export async function load({ locals, url, params }: any) {
	const post = await prisma.post.findUnique({
		where: {
			slug: params.id
		}
	});

	if (!post) {
		error(404);
	}
	const post_html = await marked(post.content);
	const date = formatDate(post.createdAt.toString());
	return {
		post,
		post_html,
		date
	};
}
