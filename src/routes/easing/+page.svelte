<script lang="ts">
    import { derived } from "svelte/store";
    import { hColors, colorSettings } from "$lib/store";
    import { fly, scale, fade, blur, slide } from "svelte/transition";
    import { circOut, linear } from "svelte/easing";
    import { plotCubic, cubicRawText, x } from "./cubicBezier";
    import { CodeBlock } from "svhighlight";
    import { tweened } from "svelte/motion";
    import {
        scaled_handle_one,
        scaled_handle_two,
        chart_size,
    } from "$lib/store";
    import Handle from "$lib/components/easing/Handle.svelte";

    const c3 = tweened($hColors.f3, colorSettings);
    hColors.subscribe((value) => {
        c3.set(value.f3);
    });

    const resolution = 50;

    const points = derived(
        [scaled_handle_one, scaled_handle_two, chart_size],
        ([$scaled_handle_one, $scaled_handle_two, $chart_size]) =>
            plotCubic(
                $scaled_handle_one,
                $scaled_handle_two,
                $chart_size,
                resolution,
            ),
    );

    let show = true;
    function easeBezier(t: number) {
        return x(t, $scaled_handle_one.x, $scaled_handle_two.x, 1);
    }
</script>

<main
    class="flex flex-wrap py-8 px-12 min-h-screen min-w-fit gap-16"
    in:fly={{ duration: 500, opacity: 0.8, y: -200, easing: circOut }}
    style:background-image={`linear-gradient(#ffffff 75%, ${$c3}80)`}
>
    <div class="flex flex-col gap-y-4" style:max-width={$chart_size + "px"}>
        <div
            class="relative overflow-hidden w-fit h-fit border-[1px] border-stone-800 bg-white/33"
            style:background-image={`linear-gradient(${$c3}80, #ffffff)`}
        >
            <svg width={$chart_size} height={$chart_size}>
                <polyline
                    points={$points}
                    style={`fill:none;stroke:${$hColors.text};stroke-width:3`}
                />
                <line
                    x1="0"
                    y1={$chart_size}
                    x2={$scaled_handle_one.x * $chart_size}
                    y2={$scaled_handle_one.y * $chart_size}
                    style={`stroke:${$hColors.f2};stroke-width:3`}
                />
                <line
                    x1={$chart_size}
                    y1="0"
                    x2={$scaled_handle_two.x * $chart_size}
                    y2={$scaled_handle_two.y * $chart_size}
                    style={`stroke:${$hColors.f2};stroke-width:3`}
                />
            </svg>
            <Handle parentSize={$chart_size} first={true} />
            <Handle parentSize={$chart_size} first={false} />
        </div>
        <CodeBlock
            code={cubicRawText}
            language="javascript"
            rounded="none"
            background="bg-stone-900"
            headerClasses="bg-stone-800"
        />
        <p class="font-mono w-3/4 text-stone-500">
            * This bezier tool is half educational, half for my own use. The
            function above operates the animations to the right.
        </p>
    </div>
    <div class="flex flex-col gap-y-8">
        <div>
            <h1 class="uppercase font-light mb-4">Cubic Bezier Easing</h1>
            <div>
                <p>
                    P1 ({$scaled_handle_one.x.toFixed(3)},
                    {$scaled_handle_one.y.toFixed(3)})
                </p>
                <p>
                    P2 ({$scaled_handle_two.x.toFixed(3)},
                    {$scaled_handle_two.y.toFixed(3)})
                </p>
            </div>
        </div>
        <hr class="border-stone-800" />
        <div class="flex flex-row gap-6">
            <button
                class="px-3 py-2 bg-stone-900 text-white w-24 uppercase"
                on:click={() => (show = !show)}
            >
                {#if show}
                    Play
                {:else}
                    Rewind
                {/if}
            </button>
            <div class="flex flex-row items-center">
                <div
                    class="w-4 h-4 border-[1px] border-stone-800"
                    style:background-color={$hColors.f3}
                />
                <p class="pl-3 py-2 w-fit uppercase">Linear</p>
            </div>
            <div class="flex flex-row items-center">
                <div
                    class="w-4 h-4 border-[1px] border-stone-800"
                    style:background-color={$hColors.text}
                />
                <p class="pl-3 py-2 w-fit uppercase">Bezier Curve</p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 min-w-96">
            <div class="h-16 w-full relative">
                {#if show}
                    <div
                        class="w-16 h-16 absolute top-0 left-0"
                        style:background-color={`${$hColors.f3}A0`}
                        transition:fly={{
                            x: 200,
                            opacity: 1,
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16 absolute top-0 left-0"
                        style:background-color={`${$hColors.text}A0`}
                        transition:fly={{
                            x: 200,
                            opacity: 1,
                            duration: 1000,
                            easing: easeBezier,
                        }}
                    />
                {/if}
            </div>
            <h6 class="lowercase text-stone-600 font-grotesk -translate-y-1">
                Fly
            </h6>
            <hr class="border-stone-600" />
            <div class="h-16 w-full flex flex-row gap-x-4">
                {#if show}
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.f3}`}
                        transition:scale={{
                            opacity: 1,
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.text}`}
                        transition:scale={{
                            opacity: 1,
                            duration: 1000,
                            easing: easeBezier,
                        }}
                    />
                {/if}
            </div>
            <h6 class="lowercase text-stone-600 font-grotesk -translate-y-1">
                scale
            </h6>
            <hr class="border-stone-600" />
            <div class="h-16 w-full flex flex-row gap-x-4">
                {#if show}
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.f3}`}
                        transition:slide={{
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.text}`}
                        transition:slide={{
                            duration: 1000,
                            easing: easeBezier,
                        }}
                    />
                {/if}
            </div>
            <h6 class="lowercase text-stone-600 font-grotesk -translate-y-1">
                slide
            </h6>
            <hr class="border-stone-600" />
            <div class="h-16 w-full flex flex-row gap-x-4">
                {#if show}
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.f3}`}
                        transition:fade={{
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16"
                        style:background-color={`${$hColors.text}`}
                        transition:fade={{
                            duration: 1000,
                            easing: easeBezier,
                        }}
                    />
                {/if}
            </div>
            <h6 class="lowercase text-stone-600 font-grotesk -translate-y-1">
                fade
            </h6>
        </div>
    </div>
</main>
