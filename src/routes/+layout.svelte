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
    import { page } from "$app/stores";
    import { hIcon } from "$lib/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import TopNav from "$lib/components/nav/TopNav.svelte";
    import Sidebar from "$lib/components/nav/Sidebar.svelte";
    import SideDisp from "$lib/components/nav/SideDisp.svelte";
</script>

<svelte:head>
    <link
        rel="icon"
        type="image/webp"
        href={images[`/src/lib/assets/iconShells/${$hIcon}.webp`].img.src}
    />
</svelte:head>

<main class="font-mono flex flex-col md:flex-row relative scroll-smooth">
    {#if $page.route.id != "/"}
        <div class="block md:hidden">
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
    <div
        class="w-full"
    >
        <slot />
    </div>
</main>

<style>
    /* .cursor {
        @apply absolute w-16 h-16 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 saturate-150;
    } */
</style>
