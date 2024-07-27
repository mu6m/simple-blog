import prisma from '$lib/helpers/prisma';
import { marked } from 'marked';

export async function GET({ request, locals }: any) {
	const posts = await prisma.post.findMany({
		take: 10,
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});
	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
        <title>Ledraa - All Posts</title>
        <icon>https://blog.ledraa.space/favicon.ico</icon>
        <updated>${new Date(posts[0].createdAt).toISOString().replace(/\.\d{3}Z$/, '+00:00')}</updated>
        <id>https://blog.ledraa.space/rss/index.xml</id>
        <link type="text/html" href="https://blog.ledraa.space/" rel="alternate"/>
        		${posts
							.map((post) => {
								return `
									<entry>
									<published>${new Date(post.createdAt).toISOString().replace(/\.\d{3}Z$/, '+00:00')}</published>
									<updated>${new Date(post.updatedAt).toISOString().replace(/\.\d{3}Z$/, '+00:00')}</updated>
									<title>${post.title}</title>
									<content type="html"><h1>${post.title}</h1><img src="${post.thumbnail}" />${marked(post.content)}</content>
									<link rel="alternate" type="text/html" href="https://blog.ledraa.space/post/${post.slug}"/>
									<id>https://blog.ledraa.space/post/${post.slug}</id>
									<author>
									<name>Ledraa</name>
									</author>
									</entry>`;
							})
							.join('')}

        </feed>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
