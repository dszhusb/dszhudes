<script land="ts">
    import { hColors, cIndex, ceramicInfo } from "$lib/store";
    import { Canvas, extend } from "@threlte/core";
    import Scene from "./Scene.svelte";
    import { Sky } from "@threlte/extras";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    let moreInfo = false;
    const limit = 2;

    let info = ceramicInfo[$cIndex];
    cIndex.subscribe((v) => {
        info = ceramicInfo[$cIndex];
    });

    extend({
        OrbitControls,
    });
</script>

<div class="relative w-full h-full">
    <div id="int-target" class="absolute w-full h-full left-0 top-0">
        <Canvas>
            <Sky
                elevation={30}
                setEnvironment={true}
                turbidity={4.78}
                rayleigh={0.3}
                mieCoefficient={0.002}
                mieDirectionalG={0.86}
            />
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
            style:background-color={$hColors.f1}
            style:border-color={$hColors.text}
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
                style:background-color={$hColors.f1}
                style:border-color={$hColors.text}
                style:color={$hColors.f3}
                class="my-4 p-2 rounded-lg border-[1px] flex flex-col md:flex-row gap-2"
            >
                <img
                    style:border-color={$hColors.text}
                    class="max-w-80 rounded-lg border-[1px]"
                    src={info.img}
                    alt="img"
                />
                <p class="max-w-64 p-4">{info.blurb}</p>
            </div>
        {/if}
    </div>
    <div
        class="pointer-events-none absolute flex w-full h-fit left-0 top-0 items-center justify-center p-4"
    >
        <button
            on:click={() => {
                console.log("clicked");
                cIndex.update((n) => Math.max(n - 1, 0));
            }}
            style:background-color={$hColors.f1}
            style:border-color={$hColors.text}
            class="pointer-events-auto uppercase py-2 px-4 rounded-l-full border-[1px] border-r-0"
            >Prev</button
        >
        <button
            on:click={() => {
                cIndex.update((n) => Math.min(n + 1, limit));
            }}
            style:background-color={$hColors.f1}
            style:border-color={$hColors.text}
            class="pointer-events-auto uppercase py-2 px-4 rounded-r-full border-[1px]"
            >Next</button
        >
    </div>
</div>
