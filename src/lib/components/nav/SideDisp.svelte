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
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import { hIcon, hColors } from "$lib/store";
    import { page } from "$app/stores";
    import Zhu from "$lib/components/nav/Zhu.svelte";

    $hIcon = Math.floor(Math.random() * 23);
    export function resetIcon() {
        $hIcon = Math.floor(Math.random() * 23);
    }

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
    onMount(() => {
        tl.to(".icon", { rotate: 60, duration: 0.5, ease: "power1" });
        tl.to(".icon", { rotate: 0, duration: 2, ease: "bounce" });
    });

    function trigger() {
        tl.play(0);
    }
</script>

<main class="w-20 border-r-[1px] border-stone-800 pt-2 sticky top-0 h-screen">
    <Zhu fill={$hColors.text} />
    <div id="sideways" class="mx-auto uppercase font-thin text-3xl pt-2">
        {$page.url.pathname.split("/").slice(-1)[0].replace("_", " ")}
    </div>
    <button on:click={resetIcon} on:click={trigger}>
        <enhanced:img
            class="icon w-full p-2 hover:saturate-150"
            src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
            alt="shell"
        />
    </button>
</main>

<style>
    #sideways {
        writing-mode: vertical-rl;
        text-orientation: sideways;
    }
</style>
