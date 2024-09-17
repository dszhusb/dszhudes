<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        `$lib/assets/iconShells/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}`,
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
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import { hIcon } from "$lib/store";
    export let flush = false;

    function goTop() {
        document.body.scrollIntoView();
    }

    let tl = gsap.timeline({ repeat: 0 });
    onMount(() => {
        tl.to(".icon", { rotate: 60, duration: 0.5, ease: "power1" });
        tl.to(".icon", { rotate: 0, duration: 2, ease: "bounce" });
    });

    function trigger() {
        if (!tl.isActive) {
            tl.play(0);
        }
    }
</script>

<div class="relative w-full flex flex-col items-center overflow-hidden">
    {#if !flush}
        <div class="h-24 w-full" />
    {/if}
    <div class="absolute bottom-0 h-8 w-full bg-stone-800" />
    <button class="w-24 px-4 pt-2 bg-stone-800 rounded-t-full" on:click={goTop}>
        <enhanced:img
            role="button"
            tabindex={0}
            on:mouseover={trigger}
            on:focus={trigger}
            class="icon z-50 saturate-150"
            src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
            alt="foot"
        />
    </button>
</div>

<style lang="postcss">
    button {
        @apply m-0;
    }
</style>
