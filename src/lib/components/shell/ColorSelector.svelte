<script lang="ts">
    import { rgbToHsl, hslToRgb } from "$lib/components/color/utilities";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    export let label: string;
    export let colors: Palette;
    export let ranges: { low: number; high: number };
    export let color: Writable<RgbColor>;
    export let colorMode: string;

    const hslColor = writable<HslColor>(rgbToHsl($color));
    hslColor.subscribe((hsl) => color.set(hslToRgb(hsl)));
</script>

<div class="full column">
    <p class="groupLabel">{label}</p>
    {#if colorMode === "rgb"}
        <label class="full">
            r: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$color.r}
                min={ranges.low}
                max={ranges.high}
                step="1"
            />
        </label>
        <label class="full">
            g: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$color.g}
                min={ranges.low}
                max={ranges.high}
                step="1"
            />
        </label>
        <label class="full">
            b: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$color.b}
                min={ranges.low}
                max={ranges.high}
                step="1"
            />
        </label>
    {:else if colorMode === "hsl"}
        <label class="full">
            h: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$hslColor.h}
                min="0"
                max="1"
                step="0.01"
            />
        </label>
        <label class="full">
            s: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$hslColor.s}
                min="0"
                max="1"
                step="0.01"
            />
        </label>
        <label class="full">
            l: <input
                class="sliderContainer"
                type="range"
                style:accent-color={colors.text}
                bind:value={$hslColor.l}
                min="0"
                max="1"
                step="0.01"
            />
        </label>
    {/if}
</div>

<style lang="postcss">
    @reference "tailwindcss";
    
    label {
        @apply font-mono font-light flex flex-row items-center;
    }

    .groupLabel {
        @apply font-light m-0 p-0 ml-4;
    }

    .full {
        @apply w-full text-left;
    }

    .column {
        @apply flex flex-col gap-2;
    }
</style>
