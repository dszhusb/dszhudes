<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let interface_hwb: Writable<HwbColor>;
    export let hwb: Writable<HwbColor>;
    export let match: number;
    export let guess: Writable<number>;

    const range: range = { low: 0, high: 1 };
    const step = 0.01;

    const submit = () => {
        hwb.set($interface_hwb);
    };
</script>

<Controls
    name="hwb"
    {guess}
    {match}
    {submit}
    last={`hwb(${$hwb.h * 360} ${$hwb.w * 100} ${$hwb.b * 100})`}
>
    <Selector
        name="hue"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hwb}
        key="h"
        fill="hwb({$interface_hwb.h}turn 0% 0%)"
        offset={1}
    />
    <Selector
        name="whiteness"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hwb}
        key="w"
        fill="hwb(0.5turn {$interface_hwb.w * 100}% 0%)"
        offset={2}
    />
    <Selector
        name="blackness"
        {step}
        {range}
        guess={guess}
        writableNum={interface_hwb}
        key="b"
        fill="hwb(0.5turn 0% {$interface_hwb.b * 100})"
        final="hwb({$hwb.h * 360} {$hwb.w * 100} {$hwb.b * 100})"
        offset={3}
    />
</Controls>
