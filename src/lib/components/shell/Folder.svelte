<script lang="ts">
    export let name;
    export let color;
    let isOpen = true;
</script>

<div class="container" style:background-color={`${color}10`}>
    <button on:click={() => (isOpen = !isOpen)} style:background-color={`${color}40`}>
        <p>{name}</p>
        <p>{isOpen ? "v" : ">"}</p>
    </button>
    {#if isOpen}
        <div class="content">
            <slot />
        </div>
    {/if}
</div>

<style lang="postcss">
    .container {
        @apply border-[1px] border-stone-800 max-w-lg;
    }

    .content {
        @apply p-4 border-stone-800 border-t-[1px];
    }

    button {
        @apply w-full uppercase text-stone-800 py-2 px-3 flex justify-between;
    }
</style>
