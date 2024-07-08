<script context="module" lang="ts">
	import type { Picture } from "vite-imagetools";
	const modules: Record<string, { default: Picture }> = import.meta.glob(
		`$lib/assets/thumbnails/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}`,
		{
			eager: true,
			query: {
				enhanced: true,
			},
		},
	);
	const images = Object.fromEntries(
		Object.entries(modules).map((x) => [x[0], x[1].default]),
	);
</script>

<script lang="ts">
	import Footer from "$lib/components/article/Footer.svelte";
	import { hColors } from "$lib/store";

	export let data;
	const {
		title,
		thumbnail,
		role,
		collaborators,
		duration,
		documentation,
		site,
		Content,
	} = data;
</script>

<article>
	{#if data.priority != 4}
		<div
			class="flex flex-col md:flex-row items-stretch border-stone-800 border-b-[1px] mb-16"
		>
			<enhanced:img
				class="w-full h-fit border-stone-800 border-r-[1px]"
				alt={title}
				src={images[`/src/lib/assets/thumbnails/${thumbnail}.webp`]}
			/>
			<div class="flex flex-col-reverse w-full md:w-1/3">
				<div class="linkContainer">
					{#if documentation !== null}
						<div class="link" style:background-color={$hColors.f2}>
							<a href={documentation}>Documentation</a>
						</div>
					{/if}
					{#if site !== null}
						<div class="link" style:background-color={$hColors.f3}>
							<a href={site}>Site</a>
						</div>
					{/if}
				</div>
				<div class="h-full px-8 pt-4 pb-8">
					<h1 class="uppercase font-bold pb-2">{title}</h1>
					<p><span class="font-semibold">Role: </span>{role}</p>
					<p>
						<span class="font-semibold"
							>Collaborators:
						</span>{collaborators}
					</p>
					<p>
						<span class="font-semibold">Duration: </span>{duration}
					</p>
				</div>
			</div>
		</div>
	{/if}
	<div class="content">
		<Content />
	</div>
	{#if data.priority != 4}
		<Footer />
	{/if}
</article>

<style>
	Picture {
		@apply w-full;
	}
	.linkContainer {
		@apply w-full flex flex-col border-t-[1px] border-stone-800 bottom-0 divide-y-[1px] divide-stone-800;
	}
	.link {
		@apply flex w-full p-4 justify-center;
	}
	.link a {
		@apply w-fit uppercase;
	}
</style>
