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
    export let title: string = "";
    export let link: string = "";
    export let description: string = "";
    export let image: string = "";
</script>

<li class="w-fit h-full mb-8 xl:basis-[47%]">
    <a
        class="flex flex-col gap-12 w-fit h-full place-content-between"
        href={`/${link}`}
    >
        <h3>{title}</h3>
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
        @apply hover:no-underline text-[var(--text)] decoration-[var(--text)];
    }

    h3 {
        @apply bg-[var(--c3)] uppercase px-2 w-fit;
    }

    a:hover h3 {
        @apply underline;
    }
</style>
