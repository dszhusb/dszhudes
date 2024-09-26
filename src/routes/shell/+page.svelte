<script lang="ts">
    import { writable, derived } from "svelte/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { hColors, chart_size, section_size } from "$lib/store";
    import {
        Shell,
        blendColorToHex,
        joinColor,
        interpolateColorPalette,
    } from "./utilities";

    const center = derived(chart_size, ($chart_size) => $chart_size / 2);
    let name = "My Beautiful Shell";
    let a = 1.5;
    let b = 0.1 * Math.random() + 0.25;
    let c = 1.2;
    let l = 100;
    let d = 0.4;
    let wireframe = false;

    const displayLength = writable(0);
    const shell = writable<Shell>(new Shell(a, b, c, d, l));
    const colors = derived(shell, ($shell) =>
        interpolateColorPalette($shell.fc, $shell.bc),
    );

    function exportSVG() {
        // @ts-ignore: Library does not have type definitions
        svgExport.downloadSvg(
            document.getElementById("shellsvg"), // SVG DOM Element object to be exported. Alternatively, a string of the serialized SVG can be passed
            name, // chart title: file name of exported image
            { width: $chart_size, height: $chart_size },
        );
    }
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

<svelte:window bind:innerWidth={$section_size} />

<main
    class="flex flex-wrap pt-8 pb-24 px-12 min-h-screen min-w-fit gap-16"
    in:fly={{ duration: 500, opacity: 0.8, y: -200, easing: circOut }}
    style:background-image={`linear-gradient(#ffffff 30%, ${$colors.f3}50)`}
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
                on:click={() => (wireframe = !wireframe)}>{wireframe ? "wireframe" : "rendered"}</button
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
        <div class="flex flex-col gap-4">
            <div class="flex flex-row">
                <button
                    class="px-3 py-2 border-[1px] border-stone-800 w-fit uppercase mr-3 bg-stone-200"
                    on:click={() => shell.set(new Shell(a, b, c, d, l))}
                >
                    Randomize
                </button>
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
            <label class="sliderContainerContainer">
                a: <input
                    class="sliderContainer"
                    type="range"
                    style:accent-color={$colors.text}
                    bind:value={a}
                    on:input={() => {
                        shell.update((s) => s.updateA(a));
                    }}
                    min="1"
                    max="5"
                    step="0.01"
                />
            </label>
            <label class="sliderContainerContainer">
                b: <input
                    class="sliderContainer"
                    type="range"
                    style:accent-color={$colors.text}
                    bind:value={b}
                    on:input={() => {
                        shell.update((s) => s.updateB(b));
                    }}
                    min="0.25"
                    max="0.4"
                    step="0.01"
                />
            </label>
            <label class="sliderContainerContainer">
                d: <input
                    class="sliderContainer"
                    type="range"
                    style:accent-color={$colors.text}
                    bind:value={d}
                    on:input={() => {
                        shell.update((s) => s.updateD(d));
                    }}
                    min="0.25"
                    max="1.25"
                    step="0.01"
                />
            </label>
            <!-- <input type="color" /> -->
        </div>
    </div>
    <div class="flex flex-col gap-y-4 max-w-96">
        <h1 class="uppercase font-light">What's with the shells?</h1>
        <p class="text-base">
            The shell motif first started when I found George R. McGhee Jr's
            seminal work “Theoretical Morphology” abandoned in a hallway at CMU.
        </p>
        <p>
            It presents a fascinating look into a mathematical perspective
            behind how the real and speculative models of organism growth.
        </p>
        <p>
            I was particularly struck by how shell morph as you tweak the
            parameters behind the model behind their construction. Building off
            of the formula described as well as making my own tweaks from my own
            experimentation and research, the first shell generator was born in
            Processing.
        </p>
        <p>
            From the early days in Processing to P5.js and Javacript and finally
            to SVGs and Typescript. This tool has come a long way.
        </p>
        <p class="font-bold">
            Feel free to play around and download your very own shell!
        </p>
    </div>
</main>

<style lang="postcss">
    label {
        @apply font-mono;
    }

    input[type="range"] {
        @apply w-2/3 flex flex-col;
    }
</style>
