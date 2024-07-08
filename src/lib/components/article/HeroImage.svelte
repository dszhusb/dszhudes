<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    export let folder: string = 'thumbnails';
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
<script>
    export let link;
    export let description;
    export let url;
</script>

<div class="imageGrid border-t-[1px] border-b-[1px] border-stone-800">
    {#if url !== undefined}
        <a href={url}>
            <enhanced:img
                class="w-full"
                alt={link}
                src={images[`/src/lib/assets/${link}.webp`]}
            />
        </a>
    {:else}
        <enhanced:img class="w-full" alt={link} src={images[`/src/lib/assets/${link}.webp`]} />
    {/if}
    {#if description !== undefined}
        <div class="float-right p-4 capitalize">{description}</div>
    {/if}
</div>
