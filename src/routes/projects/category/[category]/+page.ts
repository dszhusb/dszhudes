// src/routes/blog/category/[category]/+page.js
import type Post from '../../+page.svelte'
export const load = async ({ fetch, params }) => {
	const { category } = params;
	const response = await fetch(`/api/posts`);
	const allPosts = await response.json();

	const posts = allPosts.filter((post: Post) => post.meta.categories.includes(category));

	return {
		category,
		posts
	};
};