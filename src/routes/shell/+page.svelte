<script lang="ts">
    import { writable, derived } from "svelte/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { chart_size, section_size } from "$lib/store";
    import ColorSelector from "$lib/components/shell/ColorSelector.svelte";
    import Folder from "$lib/components/shell/Folder.svelte";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import Article from "./ShellArticle.svelte";
    import {
        Shell,
        blendColorToHex,
        joinColor,
        interpolateColorPalette,
        valueInRange,
        randomColor,
        ranges,
    } from "$lib/components/shell/utilities";
    import type { RgbColor, Parameters } from "$lib/components/shell/utilities";

    const center = derived(chart_size, ($chart_size) => $chart_size / 2);
    let name = "My Beautiful Shell";
    const parameters = writable<Parameters>({
        a: 1.5,
        b: 0.1 * Math.random() + 0.25,
        c: 1.2,
        d: 0.4,
        l: 100,
    });
    const bc = writable<RgbColor>(randomColor(ranges.bc.low, ranges.bc.high));
    const fc = writable<RgbColor>(randomColor(ranges.fc.low, ranges.fc.high));
    let wireframe = false;
    const colorMode = writable<string>("rgb");

    const displayLength = writable(0);
    const shell = writable<Shell>(new Shell($parameters, $fc, $bc));
    const colors = derived(shell, ($shell) =>
        interpolateColorPalette($shell.fc, $shell.bc),
    );

    bc.subscribe((c) => {
        shell.update((s) => s.updateBc(c));
    });

    fc.subscribe((c) => {
        shell.update((s) => s.updateFc(c));
    });

    parameters.subscribe((p) => {
        if (p.a != $shell.a) {
            shell.update((s) => s.updateA(p.a));
        }
        if (p.b != $shell.b) {
            shell.update((s) => s.updateB(p.b));
        }
        if (p.d != $shell.d) {
            shell.update((s) => s.updateD(p.d));
        }
    });

    function exportSVG() {
        // @ts-ignore: Library does not have type definitions
        svgExport.downloadSvg(
            document.getElementById("shellsvg"), // SVG DOM Element object to be exported. Alternatively, a string of the serialized SVG can be passed
            name, // chart title: file name of exported image
            { width: $chart_size, height: $chart_size },
        );
    }

    function randomize() {
        parameters.set({
            a: valueInRange(ranges.a.low, ranges.a.high, 0.7),
            b: valueInRange(ranges.b.low, ranges.b.high, 0.5),
            d: valueInRange(ranges.d.low, ranges.d.high, 0.5),
            l: 100,
        });
        bc.set(randomColor(ranges.bc.low, ranges.bc.high));
        fc.set(randomColor(ranges.fc.low, ranges.fc.high));
    }

    const setColorMode = (mode: string) => {
        colorMode.set(mode);
    };
</script>

<svelte:head>
    <!-- https://github.com/sharonchoong/svg-exportJS -->
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/canvg/3.0.9/umd.js"
        integrity="sha512-Wu9XXg78PiNE0DI4Z80lFKlEpLq7yGjquc0I35Nz+sYmSs4/oNHaSW8ACStXBoXciqwTLnSINqToeWP3iNDGmQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    ></script>
    <script
        src="https://sharonchoong.github.io/svg-exportJS/svg-export.min.js"
    ></script>
</svelte:head>

<svelte:window bind:outerWidth={$section_size} />

<main
    class="flex flex-wrap pt-8 pb-24 px-8 sm:px-12 min-h-screen w-full gap-16"
    in:fly={{ duration: 500, opacity: 0.8, y: 200, easing: circOut }}
    style:background-image={`linear-gradient(#ffffff 30%, ${$colors.f3}20)`}
>
    <div class="flex flex-col gap-y-8" style:max-width={$chart_size + "px"}>
        <div
            class="relative overflow-hidden w-fit h-fit border-[1px] border-stone-800"
            style:background-image={`linear-gradient(rgba(${joinColor($shell.bc)}, 0.2), #ffffff80)`}
        >
            <button
                class="absolute m-4 py-1 px-2 top-0 left-0 border-[1px] w-28"
                style:border-color={`${$colors.text}a0`}
                style:color={`${$colors.text}a0`}
                on:click={() => (wireframe = !wireframe)}
                >{wireframe ? "wireframe" : "rendered"}</button
            >
            <svg width={$chart_size} height={$chart_size} id="shellsvg">
                <g
                    transform={`translate(${-$shell.growth[0].cx / 2}, ${-$shell.growth[0].cy / 2})`}
                >
                    {#each $shell.growth as p, i}
                        {#if i > $displayLength}
                            <ellipse
                                cx={$center + p.cx}
                                cy={$center + p.cy}
                                rx={p.rx}
                                ry={p.ry}
                                transform={`rotate(${(p.theta * 180) / Math.PI}, ${$center + p.cx}, ${$center + p.cy})`}
                                fill={wireframe
                                    ? "none"
                                    : `rgb(${blendColorToHex($shell.bc, $shell.fc, p.mc)})`}
                                stroke={wireframe ? $colors.text : "none"}
                            />
                        {/if}
                    {/each}
                </g>
            </svg>
            <div
                class="flex flex-row h-8 w-full border-t-[1px] border-stone-800 divide-x-[1px] divide-stone-800"
            >
                {#each Object.values($colors) as c}
                    <div class="w-full h-full" style:background-color={c} />
                {/each}
            </div>
        </div>
        <div class="flex flex-col gap-8">
            <div class="flex flex-col-reverse sm:flex-row gap-y-4 w-full">
                <button
                    class="px-3 py-2 border-[1px] border-stone-800 w-fit uppercase mr-3"
                    style:background-color={`${$colors.f2}40`}
                    on:click={() => randomize()}
                >
                    Randomize
                </button>
                <div class="flex flex-row">
                    <label class="uppercase">
                        <input
                            type="text"
                            style:accent-color={$colors.text}
                            class="bg-stone-50/0 px-3 py-2 border-[1px] border-stone-800"
                            placeholder="Give it a name!"
                            bind:value={name}
                        />
                    </label>
                    <button
                        class="px-3 py-2 bg-stone-900 text-white w-fit uppercase"
                        on:click={() => exportSVG()}
                    >
                        Download
                    </button>
                </div>
            </div>
            <div class="hidden sm:block">
                <Article />
            </div>
        </div>
    </div>
    <div
        class="flex flex-col gap-y-4 flex-1"
        in:fly={{ duration: 500, opacity: 0.8, x: 200, easing: circOut }}
    >
        <Folder name="Shell Generation Parameters" color={$colors.f2}>
            <div class="column">
                <label>
                    a: <input
                        type="range"
                        style:accent-color={$colors.text}
                        bind:value={$parameters.a}
                        min={ranges.a.low}
                        max={ranges.a.high}
                        step="0.01"
                    />
                </label>
                <label>
                    b: <input
                        type="range"
                        style:accent-color={$colors.text}
                        bind:value={$parameters.b}
                        min={ranges.b.low}
                        max={ranges.b.high}
                        step="0.01"
                    />
                </label>
                <label>
                    d: <input
                        type="range"
                        style:accent-color={$colors.text}
                        bind:value={$parameters.d}
                        min={ranges.d.low}
                        max={ranges.d.high}
                        step="0.01"
                    />
                </label>
            </div>
        </Folder>
        <Folder name="Colors" color={$colors.f2}>
            <div class="column">
                <Dropdown
                    color={$colors.f2}
                    states={["rgb", "hsl"]}
                    state={$colorMode}
                    setState={setColorMode}
                />
                <div class="row">
                    <ColorSelector
                        colorMode={$colorMode}
                        label="Primary"
                        colors={$colors}
                        ranges={{
                            low: ranges.fc.low,
                            high: ranges.fc.high,
                        }}
                        color={fc}
                    />
                    <ColorSelector
                        colorMode={$colorMode}
                        label="Secondary"
                        colors={$colors}
                        ranges={{
                            low: ranges.bc.low,
                            high: ranges.bc.high,
                        }}
                        color={bc}
                    />
                </div>
            </div>
        </Folder>
        <p class="font-mono w-full max-w-lg text-stone-500 my-4">
            * The parameters a, b, d are related to shell growth. "a" is related
            to shell size. "b" is related to growth rate. "d" is related to
            cross-section dimension. Shell section colors are interpolated
            between the selected primary and secondary colors.
        </p>
        <div class="block sm:hidden">
            <Article />
        </div>
    </div>
</main>

<style lang="postcss">
    label {
        @apply font-mono font-light flex flex-row items-center;
    }

    input[type="range"] {
        @apply w-full bg-transparent;
    }

    .row {
        @apply flex flex-row gap-6;
    }

    .column {
        @apply flex flex-col gap-2;
    }
</style>
