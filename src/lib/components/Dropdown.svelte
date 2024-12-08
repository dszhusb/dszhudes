<script lang="ts">
    export let color: string;
    export let states: string[];
    export let state: string;
    export let setState: (mode: string) => void;
</script>

<div class="container">
    <div class="dropdown">
        {#each states as option}
            <button
                style:background-color={option === state
                    ? `${color}60`
                    : `${color}0A`}
                on:click={() => setState(option)}>{option}</button
            >
        {/each}
    </div>
</div>

<style lang="postcss">
    .container {
        @apply border-stone-800 border-[1px] w-fit relative flex flex-row;
    }

    .dropdown {
        @apply flex flex-row divide-stone-800 divide-x-[1px];
    }

    button {
        @apply px-3 py-2 uppercase flex;
    }
</style>
