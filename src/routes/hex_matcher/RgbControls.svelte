<script lang="ts">
    import type { Writable } from "svelte/store";
    import Controls from "./Controls.svelte";
    import Selector from "./Selector.svelte";
    export let rgb;
    export let match: number;
    export let guessed: Writable<boolean>;

    const range: range = { low: 0, high: 255 };
    const step = 1;
</script>

<Controls name="rgb" {guessed} {match}>
    <Selector
        name="red"
        {step}
        {range}
        guessed={$guessed}
        writableNum={rgb}
        key="r"
        fill="rgb(255 {255 - $rgb.r} {255 - $rgb.r})"
        offset={1}
    />
    <Selector
        name="green"
        {step}
        {range}
        guessed={$guessed}
        writableNum={rgb}
        key="g"
        fill="rgb({255 - $rgb.g} 255 {255 - $rgb.g})"
        offset={2}
    />
    <Selector
        name="blue"
        {step}
        {range}
        guessed={$guessed}
        writableNum={rgb}
        key="b"
        fill="rgb({255 - $rgb.b} {255 - $rgb.b} 255)"
        final="rgb({$rgb.r} {$rgb.g} {$rgb.b})"
        offset={3}
    />
</Controls>

<style lang="postcss">
</style>
