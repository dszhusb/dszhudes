<script land="ts">
    import { cIndex, ceramicInfo } from "$lib/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { Canvas, extend } from "@threlte/core";
    import Scene from "./Scene.svelte";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { LinearSRGBColorSpace } from "three";

    let moreInfo = false;
    const limit = 7;

    let info = ceramicInfo[$cIndex];
    cIndex.subscribe((v) => {
        info = ceramicInfo[$cIndex];
    });

    extend({
        OrbitControls,
    });
</script>

<svelte:head>
    <meta name="description" content="Ceramic Gallery Page" />
</svelte:head>

<div
    class="relative w-full h-full"
    style:background-image={`linear-gradient(#ffffff, var(--c3))`}
    in:fly={{ duration: 400, y: 100, easing: circOut }}
>
    <div id="int-target" class="absolute w-full h-full left-0 top-0">
        <Canvas colorSpace={LinearSRGBColorSpace} renderMode="on-demand">
            <Scene />
        </Canvas>
    </div>
    <div
        class="pointer-events-none absolute w-fit h-fit left-0 top-0 items-center p-4"
    >
        <button
            on:click={() => {
                moreInfo = !moreInfo;
            }}
            style:background-color="var(--c1)"
            style:border-color="var(--text)"
            class="pointer-events-auto py-2 px-4 rounded-full border-[1px]"
        >
            {#if moreInfo}
                X
            {:else}
                i
            {/if}
        </button>
        {#if moreInfo}
            <div
                style:background-color="var(--c1)"
                style:border-color="var(--text)"
                style:color="var(--c3)"
                class="my-4 p-2 rounded-lg border-[1px] flex flex-col md:flex-row gap-2"
            >
                <img
                    style:border-color="var(--text)"
                    class="max-w-80 rounded-lg border-[1px]"
                    src={info.img}
                    alt="img"
                />
                <div class="flex flex-col gap-4 max-w-64 p-2">
                    {#each info.blurb as b}
                        <p>{b}</p>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
    <div
        class="pointer-events-none absolute flex w-full h-fit left-0 top-0 items-center justify-center p-4"
    >
        <button
            on:click={() => {
                cIndex.update((n) => {
                    let nn = n - 1;
                    if (nn < 0) {
                        nn = limit;
                    }
                    return nn;
                });
            }}
            style:background-color="var(--c1)"
            style:border-color="var(--text)"
            class="pointer-events-auto uppercase py-2 px-4 rounded-l-full border-[1px] border-r-0"
        >
            Prev
        </button>
        <button
            on:click={() => {
                cIndex.update((n) => (n + 1) % limit);
            }}
            style:background-color="var(--c1)"
            style:border-color="var(--text)"
            class="pointer-events-auto uppercase py-2 px-4 rounded-r-full border-[1px]"
        >
            Next
        </button>
    </div>
</div>
