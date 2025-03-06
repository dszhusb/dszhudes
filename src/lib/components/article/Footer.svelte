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
        document.body.scrollIntoView({ behavior: "smooth" });
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

<div
    class="relative w-full flex flex-col items-center overflow-hidden bg-linear-to-b from-transparent from-50% to-[var(--c3)]"
>
    {#if !flush}
        <div class="h-32 w-full" />
    {/if}
    <button
        class="w-28 px-4 py-8"
        on:click={goTop}
        on:mouseover={trigger}
        on:focus={trigger}
    >
        <enhanced:img
            class="icon z-50 saturate-150"
            src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
            alt="foot"
        />
        <p class="text-stone-500 translate-y-1">– to top –</p>
    </button>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    
    button {
        @apply m-0;
    }
</style>
