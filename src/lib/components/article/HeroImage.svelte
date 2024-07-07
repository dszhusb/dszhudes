<script>
    export let link;
    export let description;
    export let url;
</script>

<div class="imageGrid border-t-[1px] border-b-[1px] border-stone-800">
    {#if url !== undefined}
        <a href={url}>
            <img
                class="w-full"
                alt={link}
                src={`/src/lib/assets/${link}.webp`}
            />
        </a>
    {:else}
        <img class="w-full" alt={link} src={`/src/lib/assets/${link}.webp`} />
    {/if}
    {#if description !== undefined}
        <div class="float-right p-4 capitalize">{description}</div>
    {/if}
</div>
