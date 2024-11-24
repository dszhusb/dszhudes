<script lang="ts">
    import { derived } from "svelte/store";
    import type { Writable } from "svelte/store";
    import { cmykToRgba } from "$lib/components/color/utilities";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let cmyk: Writable<CmykColor>;
    export let match: number;
    export let guess: Writable<number>;

    const rgb = derived(cmyk, ($cmyk) => cmykToRgba($cmyk));
    const c = derived(cmyk, ($cmyk) =>
        cmykToRgba({ c: $cmyk.c, m: 0, y: 0, k: 0 }),
    );
    const m = derived(cmyk, ($cmyk) =>
        cmykToRgba({ c: 0, m: $cmyk.m, y: 0, k: 0 }),
    );
    const y = derived(cmyk, ($cmyk) =>
        cmykToRgba({ c: 0, m: 0, y: $cmyk.y, k: 0 }),
    );
    const k = derived(cmyk, ($cmyk) =>
        cmykToRgba({ c: 0, m: 0, y: 0, k: $cmyk.k }),
    );
    const range: range = { low: 0, high: 1 };
    const step = 0.01;
</script>

<Controls name="cmyk" {guess} {match}>
    <Selector
        name="cyan"
        {step}
        {range}
        guess={$guess}
        writableNum={cmyk}
        key="c"
        fill="rgb({$c.r} {$c.g} {$c.b})"
        offset={1}
    />
    <Selector
        name="magenta"
        {step}
        {range}
        guess={$guess}
        writableNum={cmyk}
        key="m"
        fill="rgb({$m.r} {$m.g} {$m.b})"
        offset={2}
    />
    <Selector
        name="yellow"
        {step}
        {range}
        guess={$guess}
        writableNum={cmyk}
        key="y"
        fill="rgb({$y.r} {$y.g} {$y.b})"
        offset={3}
    />
    <Selector
        name="key"
        {step}
        {range}
        guess={$guess}
        writableNum={cmyk}
        key="k"
        fill="rgb({$k.r} {$k.g} {$k.b})"
        final="rgb({$rgb.r} {$rgb.g} {$rgb.b})"
        offset={4}
    />
</Controls>
