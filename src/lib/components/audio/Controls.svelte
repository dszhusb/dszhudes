<script>
    import { onMount } from "svelte";
    import { hColors } from "$lib/store";
    import { format } from "./utilities";
    import PlayButton from "./PlayButton.svelte";
    import {
        status,
        isPlaying,
        audioPlayer,
        index,
        audioTracks,
    } from "$lib/store";

    let duration = 0;
    export let currentTime = 0;
    let formattedTime = format(currentTime);
    let paused = true;
    let volume = 0.5;

    let title = $audioTracks[$index].title;
    let src = $audioTracks[$index].file;

    onMount(() => {
        $audioPlayer.load();
    });
</script>

<audio
    bind:this={$audioPlayer}
    bind:duration
    bind:currentTime
    bind:paused
    bind:volume
    on:canplay={() => ($status = "can play some")}
    on:canplaythrough={() => ($status = "can play all")}
    on:waiting={() => ($status = "waiting")}
    on:timeupdate={() => ($status = "playing")}
    on:seeking={() => ($status = "seeking")}
    on:ended={() => {
        $isPlaying = false;
        currentTime = 0;
    }}
    {src}
/>

<div
    class="flex flex-row gap-4 p-4 border-[1px] border-stone-800 h-fit bg-stone-100 w-fit"
>
    <PlayButton controls />
    <div class="flex flex-col">
        <p class="max-h-32 font-grotesk font-semibold">{title}</p>
        <div class="flex flex-row gap-x-4">
            <p class="">{format(currentTime)} / {format(duration)}</p>
        </div>
    </div>
</div>

<style>
</style>
