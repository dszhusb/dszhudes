<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import type { Writable } from "svelte/store";
    import { isDisabled } from "$lib/components/color/utilities";
    export let writableNum;
    export let key: string;
    export let step: number;
    export let range: range;
    export let name: string;
    export let fill: string;
    export let final: string = fill;
    export let offset: number;
    export let guess: Writable<number>;

    let toggle = true;
    guess.subscribe((v) => {
        if (v !== 0) {
            toggle = !toggle;
            setTimeout(() => {
                toggle = !toggle;
            }, 1500);
        }
    });
</script>

<div class="outer">
    <label class="inner">
        <div class="w-full flex justify-between">
            <p>{name}</p>
            <p class="text-xs">
                {$writableNum[key]}
            </p>
        </div>
        <input
            type="range"
            disabled={isDisabled($guess)}
            bind:value={$writableNum[key]}
            min={range.low}
            max={range.high}
            {step}
        />
    </label>
    <div class="container">
        {#if toggle}
            <div
                class="box top-0 mix-blend-multiply"
                style="--fill: {fill}"
                in:fade={{ duration: 300 }}
                out:fly={{ y: offset * -80, duration: 1000, opacity: 1 }}
            />
        {:else}
            <div
                class="box"
                style="--fill: {final}; top: -{offset * 80}px"
                in:fade={{ duration: 1000 }}
            />
        {/if}
    </div>
</div>

<style lang="postcss">
    label {
        @apply uppercase;
    }

    input {
        @apply accent-stone-500;
    }

    .box {
        @apply w-16 h-16 m-2 bg-[var(--fill)] absolute left-0;
    }

    .container {
        @apply relative w-20 h-20;
    }

    .outer {
        @apply flex flex-row pr-2;
    }

    .inner {
        @apply flex flex-col w-64 gap-2 px-4 py-2;
    }
</style>
