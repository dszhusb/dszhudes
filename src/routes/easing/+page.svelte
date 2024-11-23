<script lang="ts">
    import { derived } from "svelte/store";
    import {
        section_size,
        scaled_handle_one,
        scaled_handle_two,
        chart_size,
    } from "$lib/store";
    import {
        plotCubic,
        cubicPoints,
        cubicRawText,
        cubicSvelteText,
    } from "./cubicBezier";
    import { CodeBlock } from "svhighlight";
    import { fly, scale, fade, slide } from "svelte/transition";
    import { circOut, linear } from "svelte/easing";
    import Handle from "$lib/components/easing/Handle.svelte";

    let show = true;
    const resolution = 100;

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

    const curve = derived(
        [scaled_handle_one, scaled_handle_two],
        ([$scaled_handle_one, $scaled_handle_two]) =>
            cubicPoints($scaled_handle_one, $scaled_handle_two, resolution),
    );

    function easeBezier(t: number): number {
        let y = 0;
        for (let i = 0; i < $curve.length - 1; i++) {
            if ($curve[i].x <= t && t <= $curve[i + 1].x) {
                y = 1 - $curve[i].y;
            }
        }
        return y;
    }
</script>

<svelte:head>
    <meta name="description" content="Easing Experiment Page" />
</svelte:head>

<svelte:window bind:outerWidth={$section_size} />

<main
    class="flex flex-wrap pt-8 pb-24 px-8 sm:px-12 min-h-screen min-w-fit gap-16"
    in:fly={{ duration: 500, opacity: 0.8, y: 200, easing: circOut }}
    style:background-image={`linear-gradient(#ffffff 20%, var(--t50))`}
>
    <div class="flex flex-col gap-y-4" style:max-width={$chart_size + "px"}>
        <div
            class="relative overflow-hidden w-fit h-fit border-[1px] border-stone-800 bg-white/33"
            style:background-image={`linear-gradient(var(--t50), #ffffff)`}
        >
            <svg width={$chart_size} height={$chart_size}>
                <line
                    x1="0"
                    y1={$chart_size}
                    x2={$chart_size}
                    viewBox={`0 0 ${$chart_size} ${$chart_size}`}
                    y2="0"
                    style={`stroke:var(--t50);stroke-width:3`}
                />
                <polyline
                    points={$points}
                    style={`fill:none;stroke:var(--text);stroke-width:3`}
                />
                <line
                    x1="0"
                    y1={$chart_size}
                    x2={$scaled_handle_one.x * $chart_size}
                    y2={$scaled_handle_one.y * $chart_size}
                    style={`stroke:var(--c2);stroke-width:3`}
                />
                <line
                    x1={$chart_size}
                    y1="0"
                    x2={$scaled_handle_two.x * $chart_size}
                    y2={$scaled_handle_two.y * $chart_size}
                    style={`stroke:var(--c2);stroke-width:3`}
                />
            </svg>
            <Handle parentSize={$chart_size} first={true} />
            <Handle parentSize={$chart_size} first={false} />
        </div>
        <p>
            I've included an implementation for a Cubic Bezier Graphing Equation
            below. To replicate the graph, I drew from the following sources: <a
                class="font-semibold"
                href="https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/"
                >Maxime Heckel's Blog</a
            >
            and
            <a
                href="https://www.youtube.com/watch?v=aVwxzDHniEw&t=66s"
                class="font-semibold"
            >
                Freya Holmer's Video</a
            >, which got me interested in the topic in the first place.
        </p>
        <CodeBlock
            code={cubicRawText}
            language="javascript"
            rounded="none"
            background="bg-stone-800"
            headerClasses="bg-stone-900"
        />
        <p>
            At first I simply took a y(t) to get the eased value, but as I
            played around with the tool I quickly realized that the result only
            accounted for the y values of the given control points.
        </p>
        <p>
            To remedy this, wrote a function that find the y value for a given x
            by graphing the function at a given resolution and finding the
            average y between the two points a given x falls between.
        </p>
        <CodeBlock
            code={cubicSvelteText}
            language="javascript"
            rounded="none"
            background="bg-stone-800"
            headerClasses="bg-stone-900"
        />
        <p>
            This solution probably is not the ideal solution. But while I do
            more digging into the math behind finding a the y for a given x
            value, this is what I'm using for now.
        </p>
    </div>
    <div
        class="flex flex-col gap-y-8"
        in:fly={{ duration: 500, opacity: 0.8, x: 100, easing: circOut }}
    >
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
                    class="w-4 h-4 border-[1px] border-stone-800 bg-[var(--c3)]"
                />
                <p class="pl-3 py-2 w-fit uppercase">Linear</p>
            </div>
            <div class="flex flex-row items-center">
                <div
                    class="w-4 h-4 border-[1px] border-stone-800 bg-[var(--text)]"
                />
                <p class="pl-3 py-2 w-fit uppercase">Bezier Curve</p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 min-w-96">
            <div class="h-16 w-full relative">
                {#if show}
                    <div
                        class="w-16 h-16 absolute top-0 left-0 bg-[var(--c3)] opacity-70"
                        transition:fly={{
                            x: 200,
                            opacity: 1,
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16 absolute top-0 left-0 bg-[var(--text)] opacity-70"
                        transition:fly={{
                            x: 200,
                            opacity: 1,
                            duration: 1000,
                            easing: easeBezier,
                        }}
                    />
                {:else}
                    <div
                        class="w-16 h-16 absolute top-0 left-[200px] bg-[var(--c3)] opacity-70"
                        in:fade={{ delay: 1000, duration: 0 }}
                    />
                    <div
                        class="w-16 h-16 absolute top-0 left-[200px] bg-[var(--text)] opacity-70"
                        in:fade={{ delay: 1000, duration: 0 }}
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
                        class="w-16 h-16 bg-[var(--c3)]"
                        transition:scale={{
                            opacity: 1,
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16 bg-[var(--text)]"
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
                        class="w-16 h-16 bg-[var(--c3)]"
                        transition:slide={{
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16 bg-[var(--text)]"
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
                        class="w-16 h-16 bg-[var(--c3)]"
                        transition:fade={{
                            duration: 1000,
                            easing: linear,
                        }}
                    />
                    <div
                        class="w-16 h-16 var(--text)"
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
            <p class="font-mono w-full max-w-96 text-stone-500">
                * This bezier tool is half educational, half for my own use. The
                function above operates the animations to the above.
            </p>
        </div>
    </div>
</main>
