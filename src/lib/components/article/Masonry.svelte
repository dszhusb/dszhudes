<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    export let folder: string = "thumbnails";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        `$lib/assets/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}`,
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
    export let folder;
    let filtered = [];
    for (const key in images) {
        if (key.includes(`/${folder}/`)) {
            filtered.push(images[key]);
        }
    }
    let half = Math.ceil(filtered.length / 2);
</script>

<main class="grid grid-cols-1 md:grid-cols-2 divide-x-[1px] divide-stone-800 bg-stone-950">
    <div class="flex flex-col column">
        {#each filtered.slice(0, half) as image}
            <enhanced:img src={image} alt="img" />
        {/each}
    </div>
    <div class="flex flex-col column">
        {#each filtered.slice(half, filtered.length) as image}
            <enhanced:img src={image} alt="img" />
        {/each}
    </div>
</main>

<style lang="postcss">
    .column {
        @apply divide-y-[1px] divide-stone-800
    }
    img {
        @apply w-full
    }
</style>