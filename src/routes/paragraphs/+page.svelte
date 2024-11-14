<script lang="ts">
    import { writable, derived } from "svelte/store";
    import { buildCircular, buildTriangular, buildSquare } from "./utilities";
    import type { PageData } from "./$types";

    export let data: PageData;
    let alphaWidth = writable<number>(344);
    let alphaHeight = writable<number>(24);
    let ratio = derived(
        [alphaWidth, alphaHeight],
        ([$alphaWidth, $alphaHeight]) =>
            Math.round(
                ($alphaWidth / data.alphanums.length / $alphaHeight) * 100,
            ) / 100,
    );

    const inputText = writable<string>(Object.values(data.paragraphs)[0]);
    const circular = derived([inputText, ratio], ([$inputText, $ratio]) =>
        buildCircular($inputText, $ratio),
    );
    const triangular = derived([inputText, ratio], ([$inputText, $ratio]) =>
        buildTriangular($inputText, $ratio),
    );
    const square = derived([inputText, ratio], ([$inputText, $ratio]) =>
        buildSquare($inputText, $ratio),
    );
</script>

<div class="fullContainer">
    <div class="paragraphContainer">
        <section>
            <div class="sectionBar" style:background-color="var(--c1)" />
            <div class="sectionContent">
                <h3>
                    <span
                        class="h-4 w-4 rounded-full shapeSpan"
                        style:background-color="var(--c1)"
                    /> Circular Paragraph
                </h3>
                <div class="centered">
                    {#each $circular as tier}
                        <p>{tier}</p>
                    {/each}
                </div>
            </div>
        </section>
        <section>
            <div class="sectionBar" style:background-color="var(--c2)" />
            <div class="sectionContent">
                <h3>
                    <span
                        class="w-0 h-0 border-x-[0.5rem] border-b-[1rem] shapeSpan"
                        style:border-color={`transparent transparent var(--c1) transparent`}
                    /> Triangular Paragraph
                </h3>
                <div class="centered">
                    {#each $triangular as tier}
                        <p>{tier}</p>
                    {/each}
                </div>
            </div>
        </section>
        <section>
            <div class="sectionBar" style:background-color="var(--c3)" />
            <div class="sectionContent">
                <h3>
                    <span
                        class="w-4 h-4 shapeSpan"
                        style:background-color="var(--c1)"
                    /> Square Paragraph
                </h3>
                <div class="left">
                    {#each $square as tier}
                        <p>{tier}</p>
                    {/each}
                </div>
            </div>
        </section>
    </div>
    <div class="blurbContainer">
        <div class="blurb large">
            <h3>Paragraph</h3>
            <textarea bind:value={$inputText} class="area" />
        </div>
        <div class="blurb">
            <h3>General Concept</h3>
            <div class="content">
                <p>
                    Developing
                    <span
                        class="h-4 w-4 rounded-full shapeSpan"
                        style:background-color="var(--c1)"
                    />,
                    <span
                        class="w-0 h-0 border-x-[0.5rem] border-b-[1rem] shapeSpan"
                        style:border-color={`transparent transparent var(--c1) transparent`}
                    />, and
                    <span
                        class="w-4 h-4 shapeSpan"
                        style:background-color="var(--c1)"
                    />
                    line splitting algorithms that shape any given paragraph by adjusting
                    the rag.
                </p>
                <p>
                    No word-break, word-spacing, etc... my goal is to keep the
                    text as intact as possible during the shaping process.
                </p>
                <p>
                    These current algorithms are a work in progress. If you'd
                    like to see how they work or make suggestions for
                    improvement you can check out the code <a
                        href="https://github.com/dszhusb/dszhudes/tree/main/src"
                        >here</a
                    >
                </p>
            </div>
        </div>
        <div class="blurb items-baseline">
            <h3>Character Dimensions</h3>
            <div class="content">
                <div class="w-fit text-left my-2">
                    <p
                        bind:clientWidth={$alphaWidth}
                        bind:clientHeight={$alphaHeight}
                        class="w-fit border-[var(--text)] text-[var(--text)] border-[1px]"
                    >
                        {data.alphanums}
                    </p>
                    <p class="text-sm mt-1">
                        {$alphaWidth}px x {$alphaHeight}px, Average: {(
                            $alphaWidth / $alphaHeight
                        ).toFixed(2)}px, w/h: {$ratio}
                    </p>
                </div>
                <p>
                    Because the width and height of alpha-numeric characters
                    vary from character to character, The font's average width
                    to height ratio is calcuated for the given set of
                    characters.
                </p>
                <p>
                    It would be more accurate to calculate the ratio based on
                    character frequency on the english language or even the
                    input string, however, for simplicity sake I'm using a
                    simple average.
                </p>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .fullContainer {
        @apply relative flex flex-col divide-y-[1.5px] divide-[var(--text)] bg-stone-100 text-stone-900;
    }

    .paragraphContainer {
        @apply flex flex-row bg-stone-100 text-stone-900 divide-x-[1.5px] divide-[var(--text)] w-full overflow-x-auto;

        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .blurbContainer {
        @apply w-full flex flex-col gap-12 flex-wrap px-12 pt-8 pb-16;
    }

    .blurb {
        @apply flex flex-col gap-1 max-w-md;
    }

    .content {
        @apply flex flex-col gap-2;
    }

    .large {
        @apply max-w-lg;
    }

    .area {
        @apply border-[1.25px] border-stone-500 rounded-sm px-4 py-2 w-[24rem] md:w-[40rem] h-[10rem] bg-inherit;
    }

    .shapeSpan {
        @apply inline-block align-baseline;
    }

    .centered {
        @apply p-4 text-center;
    }

    .left {
        @apply p-4 text-left;
    }

    .sectionBar {
        @apply w-full h-6 border-y-[1.5px] border-[var(--text)] flex justify-center;
    }

    .sectionContent {
        @apply flex flex-col items-center px-12 py-8 w-full;
    }

    section {
        flex: 0 0 auto;
        @apply flex flex-col w-[40rem] bg-white;
    }

    h3 {
        @apply uppercase mb-2;
        color: var(--text);
    }

    section h3 {
        @apply text-center;
    }

    p {
        @apply p-0;
    }
</style>
