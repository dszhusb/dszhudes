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
    import TopNav from "$lib/components/nav/TopNav.svelte";
    import Sidebar from "$lib/components/nav/Sidebar.svelte";
    import SideDisp from "$lib/components/nav/SideDisp.svelte";

    import { spring } from "svelte/motion";
    const mouseCoords = spring({ x: 0, y: 0 });
    // mouseCoords.stiffness = 90;
    const onMouseMove = (event: MouseEvent) => {
        $mouseCoords = { x: event.x, y: event.y };
    };
</script>

<svelte:head>
    <link
        rel="icon"
        type="image/webp"
        href={images[`/src/lib/assets/iconShells/${$hIcon}.webp`].img.src}
    />
</svelte:head>

<svelte:window on:mousemove={onMouseMove} />

<main class="font-mono flex flex-col md:flex-row">
    <div
        class="block md:hidden"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >
        <TopNav />
    </div>
    <div
        class="hidden md:flex"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >
        <Sidebar />
        <SideDisp />
    </div>
    <div class="w-full">
        <slot></slot>
    </div>
    <!-- <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none">
        <enhanced:img
            class="cursor"
            style:--x={`${$mouseCoords.x}px`}
            style:--y={`${$mouseCoords.y}px`}
            src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
            alt="cursor"
        />
    </div> -->
</main>

<style>
    div[aria-current="page"] {
        @apply hidden;
    }
    /* .cursor {
        transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px));
        @apply absolute w-24 h-24 z-50 grayscale;
    } */
</style>
