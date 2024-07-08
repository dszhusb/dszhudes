// src/routes/api/posts/+server.js
import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		return a.meta.priority - b.meta.priority;
	});

	return json(sortedPosts);
};