<!-- Work Page -->
<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        "$lib/assets/thumbnails/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
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
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { hColors } from "$lib/store";
    export let data;
</script>

<div
    in:fly={{ duration: 500, opacity: 0.8, y: 50, easing: circOut }}
    class="w-full relative"
>
    <ul
        class="w-full grid grid-cols-1 md:grid-cols-2 divide-x-[1px] divide-y-[1px] divide-stone-800"
    >
        {#each data.posts as post}
            <li class="">
                <a href={post.path}>
                    <div class="relative w-full h-auto overflow-hidden">
                        <enhanced:img
                            class="w-full h-auto relative transition-transform duration-500 transform hover:scale-[102%]"
                            alt={post.meta.title}
                            src={images[
                                `/src/lib/assets/thumbnails/${post.meta.thumbnail}.webp`
                            ]}
                        />
                        <div
                            class="absolute flex gap-2 items-center top-2 left-4 px-2 bg-stone-50/60"
                        >
                            <div
                                class="w-[12px] h-[12px] border-[1px] rounded-lg border-stone-800"
                                style:background-color={$hColors.f3}
                            />
                            <p class="uppercase">
                                {post.meta.title}
                            </p>
                        </div>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</div>
