<script lang="ts">
	import Footer from '$lib/components/article/Footer.svelte'
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
	<div
		class="flex flex-col md:flex-row items-stretch border-stone-800 border-b-[1px]"
	>
		<img
			class="w-full md:w-3/5 h-fit border-stone-800 border-r-[1px]"
			alt={title}
			src={`/src/lib/assets/thumbnails/${thumbnail}.webp`}
		/>
		<div class="relative w-full">
			<div class="px-8 pt-4 pb-8">
				<h1 class="uppercase font-bold pb-2">{title}</h1>
				<p><span class="font-semibold">Role: </span>{role}</p>
				<p>
					<span class="font-semibold"
						>Collaborators:
					</span>{collaborators}
				</p>
				<p><span class="font-semibold">Duration: </span>{duration}</p>
			</div>
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
		</div>
	</div>
	<div class="content pt-16">
		<Content />
	</div>
	<Footer />
</article>

<style>
	.linkContainer {
		@apply absolute w-full flex flex-col border-t-[1px] border-stone-800 bottom-0 divide-y-[1px] divide-stone-800;
	}
	.link {
		@apply flex w-full p-4 justify-center;
	}
	.link a {
		@apply w-fit uppercase;
	}
</style>
