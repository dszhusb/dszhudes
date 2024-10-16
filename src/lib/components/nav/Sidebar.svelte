<script lang="ts">
	import { page } from "$app/stores";
	import { cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";
	import { fly } from "svelte/transition";
	import {
		hColors,
		colorSettings,
		colorSettingsSlow,
		darkMotif,
	} from "$lib/store";
	import NavIcon from "$lib/components/nav/NavIcon.svelte";
	import Wireframe from "$lib/components/nav/Wireframe.svelte";

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

	const c1 = tweened($hColors.f1, colorSettings);
	const c2 = tweened($hColors.f2, colorSettings);
	const c3 = tweened($hColors.f3, colorSettings);
	const c4 = tweened(`${$hColors.f3}80`, colorSettings);
	const cText = tweened($hColors.text, colorSettings);

	const sw = 6.75;
	const ew = 100.25;
	const f1w = tweened(sw, { duration: 200, easing: cubicOut });
	const f2w = tweened(sw, { duration: 200, easing: cubicOut });
	const f3w = tweened(sw, { duration: 200, easing: cubicOut });

	let showExperiments = false;

	hColors.subscribe((value) => {
		c1.set(value.f1);
		c2.set(value.f2);
		c3.set(value.f3);
		c4.set(value.f3);
		cText.set(value.text);
	});
</script>

<nav
	class="sticky top-0 max-h-screen h-full w-60 border-r-[1px] border-stone-800 overscroll-contain flex flex-col gap-y-0"
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
						class="fIndicator physical"
						style:background-color={darkThemed ? darkMotif.f1 : $c1}
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
						class="fIndicator digital"
						style:background-color={darkThemed ? darkMotif.f2 : $c2}
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
						class="fIndicator exploration"
						style:background-color={darkThemed ? darkMotif.f3 : $c3}
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
	<div
		role="toolbar"
		tabindex="0"
		on:mouseenter={() => (showExperiments = true)}
		on:mouseleave={() => (showExperiments = false)}
	>
		<a
			href="/experiments"
			class="experiment flex flex-col content-center w-full border-b-[1px]"
			style:text-decoration-color={darkThemed ? darkMotif.text : $cText}
			style:background-color={darkThemed ? darkMotif.f3 : $c4}
			style:border-color={darkThemed ? darkMotif.text : $cText}
		>
			<p
				style:color={darkThemed ? darkMotif.text : $cText}
				style:background-color={"rgba(255,255,255,0.7)"}
				class="p-3 w-full"
			>
				Web Experiments
			</p>
			<!-- <Wireframe fill={$cText} /> -->
		</a>
		{#if showExperiments}
			<div
				transition:fly={{ delay: 300, duration: 500, y: 5, easing: cubicOut }}
				class="experimentContainer grid grid-cols-2"
				style="--border-color:{darkThemed ? darkMotif.text : $cText}"
				style:background-color={`${$hColors.f2}18`}
				style:text-decoration-color={darkThemed
					? darkMotif.text
					: $cText}
			>
				<a href="/shell" class="experiment">
					<p style:color={darkThemed ? darkMotif.text : $cText}>
						Shells
					</p>
				</a>
				<a href="/easing" class="experiment">
					<p style:color={darkThemed ? darkMotif.text : $cText}>
						Easing
					</p>
				</a>
				<a href="/object_gallery" class="experiment">
					<p style:color={darkThemed ? darkMotif.text : $cText}>
						Ceramics
					</p>
				</a>
				<a href="/handwriting" class="experiment">
					<p style:color={darkThemed ? darkMotif.text : $cText}>
						Article
					</p>
				</a>
				<a href="/media" class="experiment col-span-2">
					<p style:color={darkThemed ? darkMotif.text : $cText}>
						Media Tapestry
					</p>
				</a>
			</div>
		{/if}
	</div>
	<div
		style:background-image={`linear-gradient(#ffffff, ${darkThemed ? darkMotif.f3 : $c3} 250%)`}
		class="w-full h-full"
	/>
</nav>

<style lang="postcss">
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
		border-color: var(--border-color);
	}

	.experimentContainer a:nth-child(odd) {
		@apply border-r-[1px];
	}

	.experimentContainer a:last-child {
		@apply border-r-0;
	}

	.experimentContainer p {
		@apply p-2 w-full text-sm;
	}

	.experiment {
		@apply p-0 border-b-[1px];
		border-color: var(--border-color);
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
