<script lang="ts">
    import { writable, derived } from "svelte/store";
    import type { Readable } from "svelte/store";
    import RgbControls from "./RgbControls.svelte";
    import HslControls from "./HslControls.svelte";
    import HwbControls from "./HwbControls.svelte";
    import Clipboard from "$lib/assets/icons/clipboard.svelte";
    import { getFormattedDate } from "./utilities";
    import {
        rgbaToHex,
        rgbToHsl,
        rgbToHwb,
        randomColor,
        invertRgbColor,
        calculateError,
        calculateMatch,
        sumMatches,
        isDisabled,
        getColorFromDate,
        isDaily,
    } from "$lib/components/color/utilities";

    const date = getFormattedDate();
    const dateColor = getColorFromDate(new Date());
    const real_color = writable<RgbColor>(dateColor);
    const inverted_hex: Readable<string> = derived(real_color, ($real_color) =>
        rgbaToHex(invertRgbColor($real_color)),
    );
    const real_hex: Readable<string> = derived(real_color, ($real_color) =>
        rgbaToHex($real_color),
    );
    const real_hsl: Readable<HslColor> = derived(real_color, ($real_color) =>
        rgbToHsl($real_color),
    );
    const real_hwb: Readable<HwbColor> = derived(real_color, ($real_color) =>
        rgbToHwb($real_color),
    );

    const rgb = writable({ r: 127, g: 127, b: 127 });
    const hwb = writable({ h: 0.5, w: 0.5, b: 0.5 });
    const hsl = writable({ h: 0.5, s: 0.5, l: 0.5 });

    const rgbGuess = writable(1);
    const hslGuess = writable(1);
    const hwbGuess = writable(1);

    const rgb_score = derived([rgb, real_color], ([$rgb, $real_color]) =>
        calculateMatch(765, calculateError($real_color, $rgb)),
    );
    const hsl_score = derived([hsl, real_hsl], ([$hsl, $real_hsl]) => {
        return Math.floor(calculateMatch(3, calculateError($real_hsl, $hsl)));
    });
    const hwb_score = derived([hwb, real_hwb], ([$hwb, $real_hwb]) => {
        return Math.floor(calculateMatch(3, calculateError($real_hwb, $hwb)));
    });

    const buttonColor: Readable<string> = derived(real_hsl, ($real_hsl) => {
        return `hsl(${$real_hsl.h}turn 100 ${$real_hsl.l > 0.5 ? 10 : 90})`;
    });

    const total_score = derived(
        [rgbGuess, hslGuess, hwbGuess, rgb_score, hsl_score, hwb_score],
        ([
            $rgbGuess,
            $hslGuess,
            $hwbGuess,
            $rgb_score,
            $hsl_score,
            $hwb_score,
        ]) =>
            sumMatches([
                { guess: $rgbGuess, percent: $rgb_score },
                { guess: $hslGuess, percent: $hsl_score },
                { guess: $hwbGuess, percent: $hwb_score },
            ]),
    );

    const resetGuesses = () => {
        rgbGuess.set(1);
        hslGuess.set(1);
        hwbGuess.set(1);
    };

    const copyScore = async () => {
        const score_p = document.getElementById("score")?.innerText;
        try {
            await navigator.clipboard.writeText(score_p ? score_p : "");
            console.log("Text copied to clipboard");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
</script>

<div
    class="mainContainer"
    style="--mystery-color: {$real_hex}; --inverted-mystery-color: {$inverted_hex}; --button-text: {$buttonColor};"
>
    <div class="centered">
        <div class="infoContainer antiScroll">
            <div class="titleContainer">
                <h1>Match the Hex...</h1>
                <p>
                    Test your color matching mettle across a variety of color
                    types.
                </p>
            </div>
            <div class="swatch">
                <div class="flex flex-row gap-2 m-4">
                    <button
                        on:click={() => {
                            resetGuesses();
                            real_color.set(randomColor(0, 255));
                        }}
                    >
                        random
                    </button>
                    <button
                        on:click={() => {
                            resetGuesses();
                            real_color.set(dateColor);
                        }}
                    >
                        daily
                    </button>
                </div>
                <div class="annotationContainer">
                    <p class="annotation">{$real_hex}</p>
                </div>
            </div>
            <div class="innerInfoContainer">
                <div class="flex justify-between pb-2">
                    <h3>
                        {isDaily($real_color, dateColor) ? "Daily " : ""}Match
                    </h3>
                    <button
                        class="border-none px-0"
                        on:click={() => copyScore()}
                    >
                        <Clipboard />
                    </button>
                </div>
                <div class="flex flex-col gap-1">
                    <p id="score">
                        {isDaily($real_color, dateColor) ? date + " |" : ""}
                        {$real_hex}
                        | Total: {$total_score}
                        <br />
                        RGB: {!isDisabled($rgbGuess) ? `${$rgb_score}%` : "???"}
                        <br />
                        HSL: {!isDisabled($hslGuess) ? `${$hsl_score}%` : "???"}
                        <br />
                        HWB: {!isDisabled($hwbGuess) ? `${$hwb_score}%` : "???"}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="guessContainer">
        <div>
            <RgbControls {rgb} match={$rgb_score} guess={rgbGuess} />
        </div>
        <div>
            <HslControls {hsl} match={$hsl_score} guess={hslGuess} />
        </div>
        <div>
            <HwbControls {hwb} match={$hwb_score} guess={hwbGuess} />
        </div>
    </div>
    <div class="centered">
        <div class="w-full max-w-md px-6 py-4 antiScroll article">
            <h1>What's this?</h1>
            <p>
                Fancy yourself a designer with a keen eye? Try your hand at
                matching the given hexcode color with rgb, hsl, and cmyk.
            </p>
            <p>
                This game is inspired by <a
                    class="font-semibold"
                    style:color={`hsl(${$real_hsl.h}turn ${$real_hsl.s * 100} 40)`}
                    href="https://hexcodle.com/">Hexcodle</a
                > – a game you guess the hexcode of a color based on a swatch. I
                wanted play around with a similar concept where starting from a hexcode
                and swatch you match the color with other color representation methods.
            </p>
            <p>More coming soon!</p>
        </div>
    </div>
</div>

<style lang="postcss">
    h1 {
        @apply uppercase font-light py-2;
    }

    h3 {
        @apply uppercase;
    }

    button {
        @apply uppercase border-[1px] px-4 w-fit border-stone-500;
    }

    .swatch button {
        @apply text-[var(--button-text)] border-[var(--button-text)];
    }

    .swatch {
        @apply w-96 h-96 bg-[var(--mystery-color)] flex flex-col justify-between;
        @apply border-y-[1.5px] border-stone-500;
    }

    .mainContainer {
        @apply flex flex-col lg:flex-row divide-x-[1px] divide-stone-500 m-auto;
    }

    .infoContainer {
        @apply flex flex-col max-w-96;
    }

    .centered {
        @apply w-full lg:w-fit flex justify-center pb-4 lg:pb-0;
    }

    .antiScroll {
        @apply lg:h-screen lg:sticky lg:top-0;
    }

    .innerInfoContainer {
        @apply flex flex-col px-4 py-3;
    }

    .guessContainer {
        @apply flex lg:flex-col;
        @apply w-full lg:w-fit overflow-scroll;
        @apply border-stone-500 divide-stone-500;
        @apply border-y-[1px] lg:border-y-0;
        @apply lg:border-y-0 lg:divide-y-[1px];
        @apply divide-x-[1px] lg:divide-x-0;
    }

    .titleContainer {
        @apply px-3 pt-2 pb-4;
    }

    .annotationContainer {
        @apply w-full float-right;
    }

    .annotation {
        @apply float-right py-2 px-3 text-[var(--button-text)] uppercase;
    }

    .article h1 {
        @apply mb-4;
    }

    .article p {
        @apply mb-4;
    }
</style>
