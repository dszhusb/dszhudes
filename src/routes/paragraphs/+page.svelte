<script lang="ts">
    import { writable, derived } from "svelte/store";
    import { buildCircular, buildTriangular, buildSquare } from "./utilities";
    import { hColors } from "$lib/store";
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
    let circular = derived([inputText, ratio], ([$inputText, $ratio]) =>
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
    <div class="px-8 py-6 flex flex-col gap-4">
        <h1>Shaped Paragraphs</h1>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="flex flex-col gap-2 items-baseline">
                <h3>Font</h3>
                <p
                    bind:clientWidth={$alphaWidth}
                    bind:clientHeight={$alphaHeight}
                    class="w-fit border-stone-800 border-[1px]"
                    style:color={$hColors.text}
                    style:border-color={$hColors.text}
                >
                    {data.alphanums}
                </p>
                <div>
                    <p>
                        Width to Height Ratio: {$ratio}
                        {$alphaWidth}px x {$alphaHeight}px
                    </p>
                </div>
            </div>
            <div class="max-w-md flex flex-col gap-2 my-4">
                <p>
                    This page hosts the results of a personal challenge,
                    developing algorithms that shape the rag of a paragraph into
                    a given shape.
                </p>
                <p>
                    This personal challenge comes with the following personal
                    restrictions: – No
                </p>
            </div>
        </div>
    </div>
    <div class="paragraphContainer">
        <section>
            <h3>Circular (Ellipsoid)<br />Paragraph</h3>
            <div class="centered">
                {#each $circular as tier}
                    <p>{tier}</p>
                {/each}
            </div>
        </section>
        <section>
            <h3>Triangular Paragraph</h3>
            <div class="centered">
                {#each $triangular as tier}
                    <p>{tier}</p>
                {/each}
            </div>
        </section>
        <section>
            <h3>Square Paragraph</h3>
            <div class="left">
                {#each $square as tier}
                    <p>{tier}</p>
                {/each}
            </div>
        </section>
    </div>
    <div>
        <textarea bind:value={$inputText} class="area" />
    </div>
</div>

<style lang="postcss">
    .fullContainer {
        @apply w-full h-full relative flex flex-col overflow-x-auto divide-y-[1px] divide-stone-800;
    }

    .paragraphContainer {
        @apply h-fit flex flex-row divide-x-[1px] divide-stone-800;
    }

    .area {
        @apply border-[1px] border-stone-800 rounded-sm px-4 py-2 min-h-96;
    }

    .centered {
        @apply p-4 text-center;
    }

    .left {
        @apply p-4 text-left;
    }

    section {
        @apply flex flex-col px-8 py-6 w-[200rem] items-center;
    }

    h1 {
        @apply uppercase font-light;
    }

    h3 {
        @apply uppercase text-center;
    }
</style>
