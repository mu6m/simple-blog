import prisma from '$lib/helpers/prisma';

export async function GET({ request, locals }: any) {
	const posts = await prisma.post.findMany();

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${posts
			.map(
				(post) => `<url>
							<loc>https://blog.ledraa.space/post/${post.slug}</loc>
							<lastmod>${new Date(post.createdAt).toISOString().replace(/\.\d{3}Z$/, '+00:00')}</lastmod>
						</url>`
			)
			.join('')}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
