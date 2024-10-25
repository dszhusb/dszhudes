<script lang="ts">
    import { writable, derived } from "svelte/store";
    import { pyramidize, splitText } from "./utilities";
    let inputText = "lorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi any string of characters modus operandi this is the coolest";
    let pyramid = pyramidize(splitText(inputText), Math.PI / 3);
</script>

<div class="paraBox">
    <input type="text" bind:value={inputText} class="paraInput" />
</div>
<div class="pyramid">
    {#each pyramid as tier}
        <p>{tier}</p>
    {/each}
</div>

<style lang="postcss">
    .paraInput {
        @apply border-[1px] border-stone-800 w-full rounded-sm px-4 py-2;
    }

    .paraBox {
        @apply w-full p-8 max-w-2xl;
    }

    .pyramid {
        @apply p-4 text-center;
    }
</style>
