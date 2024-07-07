<script>
    export let links
    export let description
    export let type

    let fileType = ".webp"
    if (type != undefined ) { fileType = `.${type}`}
</script>

<div class="imageGrid border-t-[1px] border-b-[1px] border-stone-800">
    <ul class="w-full grid grid-cols-2 divide-x-[1px] divide-y-[1px] divide-stone-800">
        {#each links as link}
            <li>
                <img class="w-full" alt={link} src={`/src/lib/assets/${link}${fileType}`} />
            </li>
        {/each}
    </ul>
    <div class="float-right p-4">{description}</div>
</div>