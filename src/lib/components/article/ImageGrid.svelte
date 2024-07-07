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
    export let links;
    export let description;
    export let type;

    let fileType = ".webp";
    if (type != undefined) {
        fileType = `.${type}`;
    }
</script>

<div class="imageGrid border-t-[1px] border-b-[1px] border-stone-800">
    <ul
        class="w-full grid grid-cols-2 divide-x-[1px] divide-y-[1px] divide-stone-800"
    >
        {#each links as link}
            <li>
                <enhanced:img
                    class="w-full"
                    alt={link}
                    src={images[`/src/lib/assets/${link}${fileType}`]}
                />
            </li>
        {/each}
    </ul>
    <div class="float-right p-4">{description}</div>
</div>
