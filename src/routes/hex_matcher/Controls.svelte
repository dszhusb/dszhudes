<script lang="ts">
    import type { Writable } from "svelte/store";
    import { showScore } from "$lib/components/color/utilities";
    export let guess: Writable<number>;
    export let last: string;
    export let name: string;
    export let match: number;
    export let submit: Function;
</script>

<div class="column" style="--last-guess: {last}">
    <div class="flex w-full justify-between p-2 pr-4">
        <div class="flex flex-col px-2">
            <h3>{name}</h3>
            <p class="text-sm">
                Match: {showScore($guess) ? `${match}%` : "???"}
            </p>
        </div>
        <div class="flex flex-row">
            <div class="w-16 h-16 bg-[var(--mystery-color)]" />
            <div class="w-16 h-16 bg-[var(--last-guess)]" />
        </div>
    </div>
    <slot />
    <div class="w-full px-4">
        <button
            disabled={$guess >= 3}
            on:click={() => {
                submit();
                guess.set($guess + 1);
            }}
        >
            {`guess (${Math.floor($guess)}/3)`}
        </button>
    </div>
</div>

<style lang="postcss">
    h3 {
        @apply uppercase;
    }

    button {
        @apply w-full py-2 mt-4 px-4 uppercase bg-stone-200 border-[1px] border-stone-500;
    }

    button:disabled {
        @apply bg-stone-100 border-stone-400 text-stone-400;
    }

    .column {
        @apply flex flex-col w-fit items-center pt-3 pb-4;
    }
</style>
