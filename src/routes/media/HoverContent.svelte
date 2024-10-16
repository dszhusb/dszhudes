<script lang="ts">
    let clicked = false;
</script>

<button
    tabindex={-1}
    class="absolute top-0 left-0 w-full h-full text-white duration-300"
    on:click={() => {
        if (window.innerWidth <= 768) {
            clicked = !clicked;
        }
    }}
>
    {#if clicked}
        <div
            class="backdrop-blur-sm bg-stone-800/80 px-6 py-4 w-full h-full duration-500 overflow-scroll"
        >
            <slot />
        </div>
    {:else}
        <div
            class="opacity-0 hover:opacity-100 backdrop-blur-sm bg-stone-800/80 px-6 py-4 w-full h-full duration-500 overflow-scroll"
        >
            <slot />
        </div>
    {/if}
</button>

<style lang="postcss">
    button {
        text-align: left;
    }
</style>
