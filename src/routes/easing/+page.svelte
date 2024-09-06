<script lang="ts">
    import { derived } from "svelte/store";
    import { hColors } from "$lib/store";
    import { plotCubic, cubicRawText } from "./cubicBezier";
    import { CodeBlock } from "svhighlight";
    import {
        scaled_handle_one,
        scaled_handle_two,
        chart_size,
    } from "$lib/store";
    import Handle from "$lib/components/easing/Handle.svelte";

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
</script>

<main class="flex flex-col">
    <div class="grid place-content-center bg-stone-950">
        <div
            class="relative border-stone-800 border-[1px] overflow-hidden bg-stone-100 w-fit h-fit"
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
    </div>
    <div class="px-8 pt-4 pb-6">
        <h1 class="uppercase font-light mb-2">Cubic Bezier Easing</h1>
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
    <CodeBlock
        code={cubicRawText}
        language="javascript"
        rounded="none"
        background="bg-stone-900"
        headerClasses="bg-stone-800"
    />
</main>
