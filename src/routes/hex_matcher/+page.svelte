<script lang="ts">
    import { writable, derived } from "svelte/store";
    import type { Readable } from "svelte/store";
    import RgbControls from "./RgbControls.svelte";
    import CmykControls from "./CmykControls.svelte";
    import HslControls from "./HslControls.svelte";
    import {
        rgbaToHex,
        rgbToHsl,
        randomColor,
        rgbaToCmyk,
        invertRgbColor,
        calculateError,
        calculateMatch,
    } from "$lib/components/color/utilities";

    const real_color = writable<RgbColor>(randomColor(0, 255));
    const inverted_hex: Readable<string> = derived(real_color, ($real_color) =>
        rgbaToHex(invertRgbColor($real_color)),
    );
    const real_hex: Readable<string> = derived(real_color, ($real_color) =>
        rgbaToHex($real_color),
    );
    const real_cmyk: Readable<CmykColor> = derived(real_color, ($real_color) =>
        rgbaToCmyk($real_color),
    );
    const real_hsl: Readable<HslColor> = derived(real_color, ($real_color) =>
        rgbToHsl($real_color),
    );

    const rgb = writable({ r: 127, g: 127, b: 127 });
    const cmyk = writable({ c: 0.5, m: 0.5, y: 0.5, k: 0.5 });
    const hsl = writable({ h: 50, s: 50, l: 50 });

    const rgb_score = derived([rgb, real_color], ([$rgb, $real_color]) =>
        calculateMatch(765, calculateError($real_color, $rgb)),
    );
    const cmyk_score = derived([cmyk, real_cmyk], ([$cmyk, $real_cmyk]) =>
        Math.floor(calculateMatch(4, calculateError($real_cmyk, $cmyk))),
    );
    const hsl_score = derived([hsl, real_hsl], ([$hsl, $real_hsl]) =>
        calculateMatch(560, Math.floor(calculateError($real_hsl, $hsl))),
    );

    const rgbGuessed = writable(false);
    const cmykGuessed = writable(false);
    const hslGuessed = writable(false);
    const total_score = derived(
        [rgbGuessed, cmykGuessed, hslGuessed, rgb_score, cmyk_score, hsl_score],
        ([
            $rgbGuessed,
            $cmykGuessed,
            $hslGuessed,
            $rgb_score,
            $cmyk_score,
            $hsl_score,
        ]) => {
            let divisor = 0;
            let sum = 0;
            if ($rgbGuessed) {
                sum += $rgb_score;
                divisor++;
            }
            if ($hslGuessed) {
                sum += $hsl_score;
                divisor++;
            }
            if ($cmykGuessed) {
                sum += $cmyk_score;
                divisor++;
            }
            return divisor === 0 ? "???" : `${sum / divisor}%`;
        },
    );

    const resetGuesses = () => {
        rgbGuessed.set(false);
        cmykGuessed.set(false);
        hslGuessed.set(false);
    };
</script>

<div
    class="mainContainer"
    style="--mystery-color: {$real_hex}; --inverted-mystery-color: {$inverted_hex};"
>
    <div class="infoContainer antiScroll">
        <div class="titleContainer">
            <h1>Match the Hex...</h1>
            <p>
                Test your color matching mettle across a variety of color types.
            </p>
        </div>
        <div class="swatch">
            <button
                on:click={() => {
                    real_color.set(randomColor(0, 255));
                    resetGuesses();
                }}
            >
                next problem
            </button>
            <div class="annotationContainer">
                <p class="annotation">{$real_hex}</p>
            </div>
        </div>
        <div class="innerInfoContainer">
            <div class="flex justify-between">
                <h3>Match</h3>
                <p>Total: {$total_score}</p>
            </div>
            <div class="flex flex-col gap-1">
                <p>RGB: {$rgbGuessed ? `${$rgb_score}%` : "???"}</p>
                <p>HSL: {$hslGuessed ? `${$hsl_score}%` : "???"}</p>
                <p>CMYK: {$cmykGuessed ? `${$cmyk_score}%` : "???"}</p>
            </div>
        </div>
    </div>
    <div class="guessContainer">
        <RgbControls {rgb} match={$rgb_score} guessed={rgbGuessed} />
        <HslControls {hsl} match={$hsl_score} guessed={hslGuessed} />
        <CmykControls {cmyk} match={$cmyk_score} guessed={cmykGuessed} />
    </div>
    <div class="w-full max-w-md px-6 py-4 antiScroll article">
        <h1>What's this?</h1>
        <p>
            Fancy yourself a designer with a keen eye? Try your hand at matching
            the given hexcode color with rgb, hsl, and cmyk.
        </p>
        <p>
            This game is inspired by <a
                class="font-semibold text-[var(--mystery-color)]"
                href="https://hexcodle.com/">Hexcodle</a
            > – a game you guess the hexcode of a color based on a swatch. I wanted
            play around with a similar concept where starting from a hexcode and
            swatch you match the color with other color representation methods.
        </p>
        <p>More coming soon!</p>
    </div>
</div>

<style lang="postcss">
    h1 {
        @apply uppercase font-light py-2;
    }

    h3 {
        @apply uppercase pb-3;
    }

    button {
        @apply uppercase border-[1px] m-4 px-4 text-white border-white w-fit;
    }

    .swatch {
        @apply w-full aspect-square md:w-96 md:h-96 bg-[var(--mystery-color)] border-y-[1.5px] border-stone-500 flex flex-col justify-between;
    }

    .mainContainer {
        @apply flex flex-col md:flex-row divide-x-[1px] divide-stone-500 m-auto;
    }

    .infoContainer {
        @apply flex flex-col max-w-96;
    }

    .antiScroll {
        @apply md:h-screen md:sticky md:top-0;
    }

    .innerInfoContainer {
        @apply flex flex-col px-4 py-3;
    }

    .guessContainer {
        @apply flex flex-col;
    }

    .titleContainer {
        @apply px-3 pt-2 pb-6;
    }

    .annotationContainer {
        @apply w-full float-right;
    }

    .annotation {
        @apply float-right py-2 px-3 text-white;
    }

    .article h1 {
        @apply mb-4;
    }

    .article p {
        @apply mb-4;
    }
</style>
