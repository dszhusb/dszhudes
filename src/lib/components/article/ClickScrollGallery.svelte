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
    import { hColors } from "$lib/store";
    export let folder;
    const filtered = Object.entries(images).filter(([key, value]) =>
        key.includes(folder),
    );
</script>

<main
    class="w-full min-h-screen relative h-full flex flex-col items-center justify-center py-16 gap-24 from-stone-800 to-stone-900 bg-gradient-to-b"
>
    <div
        class="fixed top-0 left-0 md:left-80 w-full h-screen overflow-clip brightness-50"
    >
        <div class="w-full h-full relative">
            {#each filtered.slice(0, 6) as image, index}
                <enhanced:img
                    style:top={`${Math.random() * 50 * (index % 2)}%`}
                    style:left={`${Math.random() * 33 * (index % 3)}%`}
                    style:transform={`rotate(${Math.random() * 90 - 45}deg)`}
                    class="rounded-lg max-w-2xl max-h-lg drop-shadow-2xl absolute -translate-y-1/2 -translate-x-1/2"
                    src={image[1]}
                    alt={image[0]}
                />
            {/each}
        </div>
    </div>
    {#each filtered as image, index}
        <div class="max-h-sm">
            <enhanced:img
                class="rounded-lg max-w-xl drop-shadow-2xl"
                src={image[1]}
                alt={image[0]}
            />
        </div>
    {/each}
</main>
