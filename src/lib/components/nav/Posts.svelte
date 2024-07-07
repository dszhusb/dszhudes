<script>
    import { hColors } from "$lib/store";
    export let data;
</script>

<div>
    <ul
        class="w-full grid grid-cols-2 divide-x-[1px] divide-y-[1px] divide-stone-800"
    >
        {#each data.posts as post}
            <li class="">
                <a href={post.path} class="relative">
                    <img
                        class=""
                        alt={post.meta.title}
                        src={`/src/lib/assets/thumbnails/${post.meta.thumbnail}.webp`}
                    />
                    <div
                        class="absolute flex gap-2 items-center top-2 left-4 px-2 bg-stone-50/60"
                    >
                        <div
                            class="w-[12px] h-[12px] border-[1px] rounded-lg border-stone-800"
                            style:background-color={$hColors.f3}
                        />
                        <p class="uppercase">
                            {post.meta.title}
                        </p>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</div>
