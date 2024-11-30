<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let interface_rgb: Writable<RgbColor>;
    export let rgb: Writable<RgbColor>;
    export let match: number;
    export let guess: Writable<number>;

    const range: range = { low: 0, high: 255 };
    const step = 1;

    const submit = () => {
        rgb.set($interface_rgb);
    };
</script>

<Controls
    name="rgb"
    {guess}
    {match}
    {submit}
    last={`rgb(${$rgb.r} ${$rgb.g} ${$rgb.b})`}
>
    <Selector
        name="red"
        {step}
        {range}
        guess={guess}
        writableNum={interface_rgb}
        key="r"
        fill="rgb(255 {255 - $interface_rgb.r} {255 - $interface_rgb.r})"
        offset={1}
    />
    <Selector
        name="green"
        {step}
        {range}
        guess={guess}
        writableNum={interface_rgb}
        key="g"
        fill="rgb({255 - $interface_rgb.g} 255 {255 - $interface_rgb.g})"
        offset={2}
    />
    <Selector
        name="blue"
        {step}
        {range}
        guess={guess}
        writableNum={interface_rgb}
        key="b"
        fill="rgb({255 - $interface_rgb.b} {255 - $interface_rgb.b} 255)"
        final="rgb({$rgb.r} {$rgb.g} {$rgb.b})"
        offset={3}
    />
</Controls>

<style lang="postcss">
</style>
