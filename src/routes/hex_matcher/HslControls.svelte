<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let hsl;
    export let match: number;
    export let guessed: Writable<boolean>;

    const hueRange: range = { low: 0, high: 360 };
    const range: range = { low: 0, high: 100 };
    const step = 1;
</script>

<Controls name="hsl" {guessed} {match}>
    <Selector
        name="hue"
        {step}
        range={hueRange}
        guessed={$guessed}
        writableNum={hsl}
        key="h"
        fill="hsl({$hsl.h} 100 50)"
        offset={1}
    />
    <Selector
        name="saturation"
        {step}
        {range}
        guessed={$guessed}
        writableNum={hsl}
        key="s"
        fill="hsl(180 {$hsl.s} 50)"
        offset={2}
    />
    <Selector
        name="lightness"
        {step}
        {range}
        guessed={$guessed}
        writableNum={hsl}
        key="l"
        fill="hsl(0 0 {$hsl.l})"
        final="hsl({$hsl.h} {$hsl.s} {$hsl.l})"
        offset={3}
    />
</Controls>
