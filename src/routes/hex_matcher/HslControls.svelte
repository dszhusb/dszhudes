<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let hsl;
    export let match: number;
    export let guess: Writable<number>;

    const range: range = { low: 0, high: 1 };
    const step = 0.01;
</script>

<Controls name="hsl" {guess} {match}>
    <Selector
        name="hue"
        {step}
        {range}
        guess={$guess}
        writableNum={hsl}
        key="h"
        fill="hsl({$hsl.h}turn 100 50)"
        offset={1}
    />
    <Selector
        name="saturation"
        {step}
        {range}
        guess={$guess}
        writableNum={hsl}
        key="s"
        fill="hsl(180 {$hsl.s * 100} 50)"
        offset={2}
    />
    <Selector
        name="lightness"
        {step}
        {range}
        guess={$guess}
        writableNum={hsl}
        key="l"
        fill="hsl(0 0 {$hsl.l * 100})"
        final="hsl({$hsl.h * 360} {$hsl.s * 100} {$hsl.l * 100})"
        offset={3}
    />
</Controls>
