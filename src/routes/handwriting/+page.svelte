<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    export let folder: string = "thumbnails";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        `$lib/assets/handwriting/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}`,
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
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { writable } from "svelte/store";
    export let data: PageData;

    const spanIndex = writable(1);
    let spans: NodeListOf<HTMLSpanElement>;
    let highlight = $hColors.f3
    hColors.subscribe((c) => highlight = c.f3)

    onMount(() => {
        spans = document.querySelectorAll(
            ".span",
        ) as NodeListOf<HTMLSpanElement>;

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "-50% 0px",
            threshold: 0, // Trigger when 50% of the paragraph is visible
        };

        const observer: IntersectionObserver = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    if (entry.isIntersecting) {
                        spans.forEach((span) =>
                            span.classList.remove("highlight"),
                        );
                        (entry.target as HTMLSpanElement).classList.add(
                            "highlight",
                        );
                        spanIndex.set(
                            parseInt((entry.target as HTMLSpanElement).id),
                        );
                    }
                });
            },
            observerOptions,
        );

        spans.forEach((span) => observer.observe(span));

        return () => {
            spans.forEach((span) => observer.unobserve(span));
        };
    });
</script>

<div class="max-w-4xl mx-auto">
    <enhanced:img
        class="w-full h-auto px-16 py-8 grayscale"
        alt="Highlighted"
        src={images[`/src/lib/assets/handwriting/handhead.webp`]}
    />
</div>
<div class="flex flex-row max-w-4xl mx-auto gap-x-24 p-16">
    <div class="flex flex-1 flex-col gap-12" style="--txt-color: {highlight}">
        <h2>
            <span class="highlight">✍️</span><br />A Handwriting <br />Monologue
        </h2>
        {#each Object.entries(data) as [id, info]}
            <p>
                {#each info.text as snippet, i}
                    <span class="span" id={`${info.imgId[i]}`}
                        >{snippet + " "}
                    </span>
                {/each}
            </p>
        {/each}
    </div>
    <div class="flex-1 relative">
        <div class="sticky top-16 flex flex-row gap">
            <enhanced:img
                class="w-96 h-auto drop-shadow-xl"
                alt="Highlighted"
                src={images[`/src/lib/assets/handwriting/hw${$spanIndex}.webp`]}
            />
        </div>
    </div>
</div>
<div class="max-w-4xl mx-auto p-16">
    <div class="p-12 bg-stone-100 rounded-xl border border-stone-800">
        <h3 class="leading-loose">
            The above is an experiment in how writing and ideas can be
            experienced differently on the internet. If this made you think or
            if you have any suggestions for improvements let me know at
            <b>dszhu.design@gmail.com</b>
        </h3>
    </div>
</div>
