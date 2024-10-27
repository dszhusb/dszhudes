<script lang="ts">
    import folderSvg from "$lib/assets/icons/folder.svg";
    export let name;
    export let color;
    let isOpen = true;
</script>

<div class="container" style:background-color={`${color}10`}>
    <button
        on:click={() => (isOpen = !isOpen)}
        style:background-color={`${color}40`}
    >
        <p>{name}</p>
        <img
            src={folderSvg}
            alt="folder"
            class={`max-w-5 ${!isOpen && "rotated"}`}
        />
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

    .rotated {
        @apply rotate-180;
    }

    button {
        @apply w-full uppercase text-stone-800 py-2 px-3 flex justify-between items-center;
    }
</style>
