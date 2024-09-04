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
    import { hIcon, hColors } from "$lib/store";
    import Posts from "$lib/components/nav/Posts.svelte";
    export let data;
</script>

<div class="flex h-4">
    <div class="w-full h-full" style:background-color={$hColors.text} />
    <div class="w-full h-full" style:background-color={$hColors.f1} />
    <div class="w-full h-full" style:background-color={$hColors.f2} />
    <div class="w-full h-full" style:background-color={$hColors.f3} />
</div>
<div
    class="px-12 py-10 lg:px-24 lg:py-16 relative overflow-hidden bg-stone-50 flex flex-col gap-4"
>
    <h1
        class="font-thin text-4xl font-grotesk max-w-[60rem]"
        style:color={$hColors.text}
    >
        Hi, I'm Daniel – designer, developer, and maker building digital and physical
        experiences.
    </h1>
    <h2 class="normal-case" style:color={$hColors.f1}>
        Check out my work below!
    </h2>
</div>
<Posts {data} />
