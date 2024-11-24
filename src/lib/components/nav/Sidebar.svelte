<script lang="ts">
	import { page } from "$app/stores";
	import { cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import { fly } from "svelte/transition";
	import { colorSettingsSlow, darkMotif } from "$lib/store";
	import NavIcon from "$lib/components/nav/NavIcon.svelte";

	const cDark = "#292524";
	const cLight = "#e7e5e4";
	const cWork = tweened(cDark, colorSettingsSlow);
	const cAbout = tweened(cLight, colorSettingsSlow);
	let darkThemed = false;
	page.subscribe((value) => {
		darkThemed = false;
		if (value.url.pathname.includes("shell")) {
			darkThemed = true;
		}

		if (value.url.pathname.includes("about")) {
			cWork.set(cLight);
			cAbout.set(cDark);
		} else {
			cWork.set(cDark);
			cAbout.set(cLight);
		}
	});

	const sw = 6.75;
	const ew = 100.25;
	const f1w = tweened(sw, { duration: 200, easing: cubicOut });
	const f2w = tweened(sw, { duration: 200, easing: cubicOut });
	const f3w = tweened(sw, { duration: 200, easing: cubicOut });

	let showExperiments = false;
</script>

<nav
	style="--nav-text: {darkThemed ? darkMotif.text : 'var(--text)'};
		   --nav-c1: {darkThemed ? darkMotif.f1 : 'var(--c1'};
		   --nav-c2: {darkThemed ? darkMotif.f2 : 'var(--c2'};
		   --nav-c3: {darkThemed ? darkMotif.f3 : 'var(--c3'};
		   --nav-t50: {darkThemed ? darkMotif.f3 + '60' : 'var(--t50)'};"
>
	<div class="button mt-4">
		<a href="/">daniel zhu</a>
	</div>
	<a href="/about" class="navA">
		<NavIcon />
	</a>
	<div class="bg-stone-200">
		<button
			class="button border"
			on:click={() => {
				f1w.set(sw);
				f2w.set(sw);
				f3w.set(sw);
			}}
		>
			<a
				href="/projects"
				style:background-color={$cWork}
				aria-current={$page.url.pathname.includes("/about")
					? undefined
					: "page"}>work</a
			>
		</button>
		<div class="indicators">
			<div class="divide-y-[1px] divide-stone-800">
				<button
					class="button relative inside"
					on:click={() => {
						f1w.set(ew);
						f2w.set(sw);
						f3w.set(sw);
					}}
				>
					<div
						class="fIndicator physical bg-[var(--nav-c1)]"
						style:width={`${$f1w}%`}
					/>
					<a href="/projects/category/physical">physical</a>
				</button>
				<button
					class="button relative inside"
					on:click={() => {
						f1w.set(sw);
						f2w.set(ew);
						f3w.set(sw);
					}}
				>
					<div
						class="fIndicator digital bg-[var(--nav-c2)]"
						style:width={`${$f2w}%`}
					/>
					<a href="/projects/category/digital">digital</a>
				</button>
				<button
					class="button relative inside"
					on:click={() => {
						f1w.set(sw);
						f2w.set(sw);
						f3w.set(ew);
					}}
				>
					<div
						class="fIndicator exploration bg-[var(--nav-c3)]"
						style:width={`${$f3w}%`}
					/>
					<a href="/projects/category/exploration">exploration</a>
				</button>
			</div>
		</div>
		<div class="button border">
			<a
				href="/about"
				style:background-color={$cAbout}
				aria-current={!$page.url.pathname.includes("/about")
					? undefined
					: "page"}>about</a
			>
		</div>
	</div>
	<div class="relative h-full w-full">
		<div
			class="w-full h-full bg-gradient-to-b from-transparent to-[var(--nav-t50)] absolute top-0 pointer-events-none"
		/>
		<div
			role="toolbar"
			tabindex="0"
			on:mouseenter={() => (showExperiments = true)}
			on:mouseleave={() => (showExperiments = false)}
		>
			<a
				href="/experiments"
				class="experiment flex flex-col content-center w-full bg-[var(--nav-c3)]"
			>
				<p class="p-3 w-full bg-[rgba(255,255,255,0.7)]">
					Web Experiments
				</p>
			</a>
			{#if showExperiments}
				<div
					transition:fly={{
						delay: 300,
						duration: 500,
						y: 5,
						easing: cubicOut,
					}}
					class="experimentContainer"
				>
					<a href="/shell" class="experiment">
						<p>Shells</p>
					</a>
					<a href="/easing" class="experiment">
						<p>Easing</p>
					</a>
					<a href="/object_gallery" class="experiment">
						<p>Ceramics</p>
					</a>
					<a href="/handwriting" class="experiment">
						<p>Article</p>
					</a>
					<a href="/media" class="experiment">
						<p>Media</p>
					</a>
					<a href="/paragraphs" class="experiment">
						<p>Paragraphs</p>
					</a>
					<a href="/hex_matcher" class="experiment col-span-2">
						<p>Hex Matcher</p>
					</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply sticky top-0 max-h-screen h-full w-60 border-r-[1px] border-stone-800 overscroll-contain flex flex-col gap-y-0;
	}
	.button {
		@apply w-full flex place-content-center text-stone-800;
	}
	.border {
		@apply border-stone-800 border-b-[1px] border-t-[1px] border-x-0;
	}
	.inside {
		@apply bg-stone-100;
	}

	.experimentContainer {
		@apply grid grid-cols-2;
		@apply text-[var(--nav-text)] border-[var(--nav-text)];
	}

	.experimentContainer a:nth-child(odd) {
		@apply border-r-[1px];
		@apply bg-[var(--t5)];
	}

	.experimentContainer a:last-child {
		@apply border-r-0;
	}

	.experimentContainer p {
		@apply p-2 w-full text-sm;
	}

	.experiment {
		@apply p-0 border-b-[1px];
		@apply text-[var(--nav-text)] border-[var(--nav-text)];
	}

	a {
		@apply w-full p-4 uppercase text-center z-50;
	}

	.navA {
		@apply p-0 m-0;
	}

	a[aria-current="page"] {
		@apply text-white;
	}

	.fIndicator {
		@apply absolute top-0 left-0 h-full w-4 border-stone-800 border-r-[0.5px];
	}
</style>
