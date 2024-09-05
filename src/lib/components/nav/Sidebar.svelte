<script lang="ts">
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { page } from "$app/stores";
	import { tweened } from "svelte/motion";
	import { hColors, colorSettings } from "$lib/store";
	import NavIcon from "$lib/components/nav/NavIcon.svelte";

	const cWork = tweened('#e7e5e4', colorSettings);
	const cAbout = tweened('$#292524', colorSettings);
	const c1 = tweened($hColors.f1, colorSettings);
	const c2 = tweened($hColors.f2, colorSettings);
	const c3 = tweened($hColors.f3, colorSettings);
	const cText = tweened($hColors.text, colorSettings);

	// const f1w = tweened('1rem')

	hColors.subscribe((value) => {
		c1.set(value.f1);
		c2.set(value.f2);
		c3.set(value.f3);
		cText.set(value.text);
	});

	let physical: GSAPTween;
	let digital: GSAPTween;
	let exploration: GSAPTween;

	onMount(() => {
		physical = gsap.fromTo(
			".physical",
			{ width: "1rem", duration: 0.2 },
			{
				width: "100%",
				duration: 0.2,
				borderStyle: "none",
			},
		);
		digital = gsap.fromTo(
			".digital",
			{ width: "1rem", duration: 0.2 },
			{
				width: "100%",
				duration: 0.2,
				borderStyle: "none",
			},
		);
		exploration = gsap.fromTo(
			".exploration",
			{ width: "1rem", duration: 0.2 },
			{
				width: "100%",
				duration: 0.2,
				borderStyle: "none",
			},
		);

		physical.reverse();
		digital.reverse();
		exploration.reverse();
	});
</script>

<nav
	class="sticky top-0 max-h-screen h-full w-60 border-r-[1px] border-stone-800 overscroll-contain"
>
	<div class="button mt-4">
		<a href="/">daniel zhu</a>
	</div>
	<NavIcon />
	<div class="bg-stone-200">
		<button
			class="button border"
			on:click={() => {
				physical.reverse();
				digital.reverse();
				exploration.reverse();
			}}
		>
			<a
				href="/projects"
				aria-current={$page.url.pathname.includes("/projects")
					? "page"
					: undefined}>work</a
			>
		</button>
		<div class="indicators">
			<div class="divide-y-[1px] divide-stone-800">
				<button
					class="button relative inside"
					on:click={() => {
						physical.play();
						digital.reverse();
						exploration.reverse();
					}}
				>
					<div
						class="fIndicator physical"
						style:background-color={$c1}
					/>
					<a href="/projects/category/physical">physical</a>
				</button>
				<button
					class="button relative inside"
					on:click={() => {
						physical.reverse();
						digital.play();
						exploration.reverse();
					}}
				>
					<div
						class="fIndicator digital"
						style:background-color={$c2}
					/>
					<a href="/projects/category/digital">digital</a>
				</button>
				<button
					class="button relative inside"
					on:click={() => {
						physical.reverse();
						digital.reverse();
						exploration.play();
					}}
				>
					<div
						class="fIndicator exploration"
						style:background-color={$c3}
					/>
					<a href="/projects/category/exploration">exploration</a>
				</button>
			</div>
		</div>
		<div class="button border">
			<a
				href="/about"
				aria-current={!$page.url.pathname.includes("/projects")
					? "page"
					: undefined}>about</a
			>
		</div>
	</div>
	<a
		href="/object_gallery"
		class="experiment"
		style:text-decoration-color={$cText}
	>
		<p
			style:color={$cText}
			style:background-color={$c2}
			style:border-color={$cText}
			class="p-2 border-b-[1px] w-full"
		>
			My Ceramics Collection
		</p>
	</a>
	<a
		href="/easing"
		class="experiment"
		style:text-decoration-color={$cText}
	>
		<p
			style:color={$cText}
			style:background-color={$c3}
			style:border-color={$cText}
			class="p-2 border-b-[1px] w-full"
		>
			Easing Experiment
		</p>
	</a>
</nav>

<style>
	.button {
		@apply w-full flex place-content-center text-stone-800;
	}
	.border {
		@apply border-stone-800 border-b-[1px] border-t-[1px] border-x-0;
	}
	.inside {
		@apply bg-stone-100;
	}

	.experiment {
		@apply p-0;
	}

	a {
		@apply w-full p-4 uppercase text-center z-50;
	}
	a[aria-current="page"] {
		@apply bg-stone-800 text-white;
	}

	.fIndicator {
		@apply absolute top-0 left-0 h-full w-4 border-stone-800 border-r-[1px];
	}
</style>
