<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        "$lib/assets/experiments/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
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
    import { tweened } from "svelte/motion";
    import { hColors, colorSettings } from "$lib/store";
    export let title: string = "";
    export let link: string = "";
    export let description: string = "";
    export let image: string = "";

    const c3 = tweened($hColors.f3, colorSettings);
    const cText = tweened($hColors.text, colorSettings);

    hColors.subscribe((value) => {
        c3.set(value.f3);
        cText.set(value.text);
    });
</script>

<li class="w-fit h-full mb-8 xl:basis-[47%]">
    <a
        class="flex flex-col gap-12 w-fit h-full place-content-between"
        href={`/${link}`}
        style:color={$cText}
        style:text-decoration-color={$cText}
    >
        <h3 style:background-color={$c3} class="uppercase px-2 w-fit">
            {title}
        </h3>
        <div class="flex flex-col gap-8">
            <p class="w-4/5">
                {description}
            </p>
            <div
                class="w-full h-auto overflow-clip border-[1px] border-stone-500"
            >
                <enhanced:img
                    src={images[`/src/lib/assets/experiments/${image}.webp`]}
                    alt={title}
                    class="w-full h-auto hover:scale-[101%] duration-500"
                />
            </div>
        </div>
    </a>
</li>

<style lang="postcss">
    a {
        @apply hover:no-underline;
    }

    a:hover h3 {
        @apply underline;
    }
</style>
