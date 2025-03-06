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
    import { writable } from "svelte/store";
    import interval from "$lib/utils/interval";
    import {
        getRandomShell,
        randomizeShell,
        initializeShells,
    } from "./utilities";
    import type { Shell } from "./utilities";
    import Headshot from "$lib/assets/icons/headshot.webp";
    import Bust from "$lib/assets/icons/bust.png";
    import { hIcon } from "$lib/store";

    const threshold = 1;
    const ranges: range[] = [
        { low: 12, high: 18 },
        { low: 7, high: 11 },
        { low: 6, high: 10 },
    ];

    const shells = writable<Shell[]>([]);

    hIcon.subscribe(() => {
        shells.set(initializeShells(ranges, threshold));
    });

    let reset = interval(
        () => shells.set(initializeShells(ranges, threshold)),
        2000,
    );
</script>

<div class="relative overflow-clip">
    <img class="w-full duration-1000 z-0" src={Headshot} alt="portrait" />
    <img
        class="w-full duration-1000 absolute top-0 z-10 pointer-events-none"
        src={Bust}
        alt="bust"
    />
    {#each $shells as s, index}
        <button
            on:click={() => {
                shells.update((s) =>
                    randomizeShell(s, ranges, index, threshold),
                );
                reset();
            }}
            class="shell"
            style="--rotation: {s.rotation}deg; --h-rotation: {s.rotation +
                30}deg; --x: {s.position.x}%; --y: {s.position
                .y}%; --size: {s.size}rem; --z: {index >= threshold ? 20 : 0}"
        >
            <enhanced:img
                src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
                alt="shell"
            />
        </button>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";
    
    .shell {
        @apply absolute saturate-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
        @apply w-[var(--size)] left-[var(--x)] top-[var(--y)] rotate-[var(--rotation)] duration-700;
        z-index: var(--z);
    }

    .shell:hover {
        @apply saturate-200 scale-125 rotate-[var(--h-rotation)] duration-300;
    }

    button {
        @apply p-0 m-0;
    }
</style>
