<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let interface_hsl: Writable<HslColor>;
    export let hsl: Writable<HslColor>;
    export let match: number;
    export let guess: Writable<number>;

    const range: range = { low: 0, high: 1 };
    const step = 0.01;

    const submit = () => {
        hsl.set($interface_hsl);
    };
</script>

<Controls
    name="hsl"
    {guess}
    {match}
    {submit}
    last={`hsl(${$hsl.h}turn ${$hsl.s * 100}% ${$hsl.l * 100}%)`}
>
    <Selector
        name="hue"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hsl}
        key="h"
        fill="hsl({$interface_hsl.h}turn 100% 50%)"
        offset={1}
    />
    <Selector
        name="saturation"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hsl}
        key="s"
        fill="hsl(0.5turn {$interface_hsl.s * 100}% 50%)"
        offset={2}
    />
    <Selector
        name="lightness"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hsl}
        key="l"
        fill="hsl(0turn 0% {$interface_hsl.l * 100}%)"
        final="hsl({$hsl.h}turn {$hsl.s * 100}% {$hsl.l * 100}%)"
        offset={3}
    />
</Controls>
