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
    import { onMount } from "svelte";
    import { seekIndex, makeTimesList } from "./utilities";
    import Controls from "$lib/components/audio/Controls.svelte";
    import type { PageData } from "./$types";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    export let data: PageData;

    const times = makeTimesList(data);
    const spanIndex = writable(1);
    const audioIndex = writable(-1);
    let spans: NodeListOf<HTMLSpanElement>;
    let audioTime = 0;

    audioIndex.subscribe((i) => {
        if (spans != null) {
            spans.forEach((span) => span.classList.remove("highlight"));
            const spanArr = Array.from(spans);
            spanArr[i].classList.add("highlight");
            spanArr[i].scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    let mobileVisible = false;

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

    $: audioIndex.set(seekIndex(times, audioTime));
</script>

<svelte:head>
    <meta name="description" content="Handwriting Experiment Page" />
</svelte:head>

<main style:background-image={`linear-gradient(#ffffff 20%, var(--c3) 400%)`}>
    <div
        class="max-w-4xl mx-auto pb-16"
        in:fly={{ duration: 300, opacity: 0.8, x: 100, easing: circOut }}
    >
        <enhanced:img
            class="w-full h-auto px-16 py-8 grayscale"
            alt="Highlighted"
            src={images[`/src/lib/assets/handwriting/handhead.webp`]}
        />
        <p class="px-16 text-stone-600">
            The following is an experiment, exploring how speaking and written
            mediums can be presented on the web. I started by jotting down some
            rambling thoughts on handwriting in a notepad, which I read into a
            mic and transcribed. The two versions of the text are presented side
            by side with an audio reading. Feel free to scroll along the text
            and compare the two versions or listen along!
        </p>
    </div>
    <div
        class="flex flex-col sm:flex-row max-w-4xl mx-auto gap-x-24 p-16"
        in:fly={{ duration: 300, opacity: 0.8, y: 200, easing: circOut }}
    >
        <div class="flex flex-1 flex-col gap-12">
            <h2 class="font-semibold">
                <span style:color="var(--c1)" class="text-6xl">✍️</span>
                <br />Handwriting<br />Rambling
            </h2>
            {#each Object.entries(data) as [id, info]}
                <p>
                    {#each info.text as snippet, j}
                        <span class={`span`} id={`${info.imgId[j]}`}
                            >{snippet + " "}
                        </span>
                    {/each}
                </p>
            {/each}
        </div>
        <div class="flex-1 relative overflow-visible">
            <div
                class="fixed bottom-8 sm:sticky sm:top-16 flex flex-col-reverse sm:flex-col gap-y-8"
            >
                <Controls bind:currentTime={audioTime} />
                <enhanced:img
                    class="w-96 h-auto drop-shadow-xl hidden sm:block"
                    alt="Highlighted"
                    src={images[
                        `/src/lib/assets/handwriting/hw${$spanIndex}.webp`
                    ]}
                />
                <p class="text-right hidden sm:block">
                    Original Notepad Script
                </p>
            </div>
        </div>
    </div>
    <div class="max-w-4xl mx-auto p-16">
        <div class="p-12 bg-stone-100 rounded-xl border border-stone-800">
            <h3 class="leading-loose">
                The above is an experiment in how writing and ideas can be
                experienced differently on the internet. If this made you think
                or if you have any suggestions for improvements let me know at
                <b>dszhu.design@gmail.com</b>
            </h3>
        </div>
    </div>
</main>
