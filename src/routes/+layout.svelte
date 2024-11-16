<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        "$lib/assets/iconShells/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
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
    import "../app.css";
    import { inject } from "@vercel/analytics";
    import { derived } from "svelte/store";
    import { page, navigating } from "$app/stores";
    import { createHexTransparency } from "$lib/components/color/utilities";
    import { hIcon, hColors, colorSettings } from "$lib/store";
    import { tweened } from "svelte/motion";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import Loading from "$lib/components/nav/Loading.svelte";
    import TopNav from "$lib/components/nav/TopNav.svelte";
    import Sidebar from "$lib/components/nav/Sidebar.svelte";
    import SideDisp from "$lib/components/nav/SideDisp.svelte";
    inject();

    const ctext = tweened($hColors.text, colorSettings);
    const c1 = tweened($hColors.f1, colorSettings);
    const c2 = tweened($hColors.f2, colorSettings);
    const c3 = tweened($hColors.f3, colorSettings);

    const rawT50 = derived(hColors, ($hColors) => {
        const color = createHexTransparency($hColors.f3, 0.5);
        return color ? color : $hColors.f3;
    });

    const rawT25 = derived(hColors, ($hColors) => {
        const color = createHexTransparency($hColors.f3, 0.25);
        return color ? color : $hColors.f3;
    });

    const rawT15 = derived(hColors, ($hColors) => {
        const color = createHexTransparency($hColors.f3, 0.15);
        return color ? color : $hColors.f3;
    });

    const rawT5 = derived(hColors, ($hColors) => {
        const color = createHexTransparency($hColors.f3, 0.05);
        return color ? color : $hColors.f3;
    });

    const t50 = tweened($rawT50, colorSettings);
    const t25 = tweened($rawT25, colorSettings);
    const t15 = tweened($rawT15, colorSettings);
    const t5 = tweened($rawT5, colorSettings);

    hColors.subscribe((value) => {
        ctext.set(value.text);
        c1.set(value.f1);
        c2.set(value.f2);
        c3.set(value.f3);
        t50.set($rawT50);
        t25.set($rawT25);
        t15.set($rawT15);
        t5.set($rawT5);
    });
</script>

<svelte:head>
    <link
        rel="icon"
        type="image/webp"
        href={images[`/src/lib/assets/iconShells/${$hIcon}.webp`].img.src}
    />
</svelte:head>

<main
    class="font-mono relative scroll-smooth w-screen flex flex-col md:flex-row"
    style="--select-color:{$c3}c0; --text:{$ctext}; --c1: {$c1}; --c2: {$c2}; --c3: {$c3}; --t50: {$t50}; --t25: {$t25}; --t15: {$t15}; --t5: {$t5}"
>
    {#if $page.route.id != "/"}
        <div class="block md:hidden sticky top-0 z-[999]">
            <TopNav />
        </div>
        <div
            class="hidden md:flex"
            in:fly={{ duration: 200, opacity: 0.8, x: -200, easing: circOut }}
        >
            <Sidebar />
            <SideDisp />
        </div>
    {/if}
    <div class="w-full overflow-auto">
        {#if $navigating}
            <Loading />
        {:else}
            <slot />
        {/if}
    </div>
</main>

<style lang="postcss">
    /* .cursor {
        @apply absolute w-16 h-16 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 saturate-150;
    } */
</style>
