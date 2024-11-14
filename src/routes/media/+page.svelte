<script lang="ts">
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { writable } from "svelte/store";
    import {
        mixLists,
        isBook,
        isSpotifySong,
        getSongBlurbMap,
        shuffle,
    } from "./utilities";
    import FilledImage from "./FilledImage.svelte";
    import HoverContent from "./HoverContent.svelte";
    import ContentPatch from "./ContentPatch.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

    const books: Book[] = data.books;
    const songs: SpotifySong[] = data.items;
    const mixed: (Book | SpotifySong)[] = mixLists(books, songs);
    const songBlurbs: Map<string, MusicBlurb> = getSongBlurbMap(
        data.music_blurbs,
    );

    const items = writable<any[]>(mixed);
</script>

<main
    class="w-full h-full"
    in:fly={{ duration: 500, opacity: 0.8, y: -100, easing: circOut }}
>
    <div
        class="w-full px-12 pt-8 pb-10 flex flex-col lg:flex-row place-content-between lg:items-center gap-6"
    >
        <h1 class="uppercase font-mono font-light">the media on my mind...</h1>
        <div class="filters">
            <button
                class:active={$items.length === mixed.length}
                on:click={() => {
                    items.set(shuffle(mixed));
                }}>All</button
            >
            <button
                class:active={$items.length === books.length}
                on:click={() => {
                    items.set(shuffle(books));
                }}>Books</button
            >
            <button
                class:active={$items.length === songs.length}
                on:click={() => {
                    items.set(shuffle(songs));
                }}>Music</button
            >
        </div>
    </div>
    {#key $items}
        <div
            class="flex flex-wrap border-t-[1px] border-stone-800"
            in:fly={{ y: 100, duration: 1000, opacity: 0.5 }}
        >
            {#each $items as item}
                {#if isBook(item)}
                    <ContentPatch>
                        <FilledImage url={item.image} alt={item.title} />
                        <HoverContent>
                            <a href={item.link} target="_blank">
                                <h3 class="uppercase mb-1">{item.title}</h3>
                            </a>
                            <h4 class="font-light mb-6">{item.author}</h4>
                            <p class="mb-6">{item.blurb}</p>
                        </HoverContent>
                    </ContentPatch>
                {/if}
                {#if isSpotifySong(item)}
                    <ContentPatch>
                        <FilledImage
                            url={item.track.album.images[0].url}
                            alt={item.track.name}
                            external={true}
                        />
                        <HoverContent>
                            <div
                                class="w-full h-full flex flex-col place-content-between"
                            >
                                <div>
                                    <a
                                        href={item.track.external_urls.spotify}
                                        target="_blank"
                                    >
                                        <h3 class="uppercase">
                                            {item.track.name}
                                        </h3>
                                    </a>
                                    {#each item.track.artists as artist, i}
                                        <a
                                            class="inline-block"
                                            href={artist.external_urls.spotify}
                                        >
                                            <h4 class="font-light mr-2">
                                                {artist.name}{i <
                                                item.track.artists.length - 1
                                                    ? ","
                                                    : ""}
                                            </h4>
                                        </a>
                                    {/each}
                                    <p class="mt-6">
                                        {songBlurbs.get(item.track.id)?.blurb}
                                    </p>
                                </div>
                                <a
                                    class="w-full flex justify-end opacity-75 mb-2"
                                    href={item.track.uri}
                                >
                                    <img
                                        class="w-12 h-auto"
                                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
                                        alt="spotify icon"
                                    />
                                </a>
                            </div>
                        </HoverContent>
                    </ContentPatch>
                {/if}
            {/each}
        </div>
    {/key}
</main>

<style lang="postcss">
    h3 {
        @apply m-0 p-0;
    }

    a {
        @apply m-0 p-0;
    }

    .filters button {
        @apply border-stone-800 border-[1px] rounded-full px-4 py-2;
    }

    .active {
        @apply bg-stone-800 text-white;
    }
</style>
