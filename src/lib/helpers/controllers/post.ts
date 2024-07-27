import { format, parseISO, formatDistanceToNowStrict } from 'date-fns';
import prisma from '$lib/helpers/prisma';

const per_page = 12;

export async function list(page: number, search_text: string) {
	const data = await prisma.post.findMany({
		skip: (page - 1) * per_page,
		take: per_page,
		where: {
			OR: [
				{
					title: {
						contains: search_text
					}
				},
				{
					content: {
						contains: search_text
					}
				}
			],
			published: true
		},
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});
	return data;
}

export const formatDate = (dateString: string) => {
	const date = parseISO(new Date(dateString).toISOString());
	const formattedDate = format(date, 'MMMM d, yyyy');
	const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
	return `${formattedDate} (${timeAgo})`;
};
