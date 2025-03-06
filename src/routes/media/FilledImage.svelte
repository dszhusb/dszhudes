<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    export let folder: string = "thumbnails";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        `$lib/assets/media/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}`,
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
    export let url;
    export let alt;
    export let external = false;
</script>

<div class="w-full h-full overflow-hidden relative flex items-center">
    {#if external}
        <img class="underlay" src={url} {alt} />
        <img class="overlay" src={url} {alt} />
    {:else}
        <enhanced:img
            class="underlay"
            src={images[`/src/lib/assets/media/${url}.webp`]}
            {alt}
        />
        <enhanced:img
            class="overlay"
            src={images[`/src/lib/assets/media/${url}.webp`]}
            {alt}
        />
    {/if}
</div>

<style lang="postcss">
    @reference "tailwindcss";
    
    .underlay {
        @apply w-auto h-full absolute -z-40 top-0 blur-md scale-125 brightness-90;
    }

    .overlay {
        @apply w-full h-auto;
    }
</style>
