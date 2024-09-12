<!-- Modified from: https://svelte.dev/repl/56928dbff1b141a39f635522e7113f3c?version=3.32.3 -->
<script lang="ts">
    import {
        status,
        isPlaying,
        audioPlayer,
        index,
        audioTracks,
        addTrack,
    } from "$lib/store";
    import PlayIcon from "./PlayIcon.svelte";
    import PauseIcon from "./PauseIcon.svelte";

    export let controls = false;
    export let track = false;
    export let title = "";
    export let artist = "";
    export let file = "";
    const iconSize = 1;

    function playTrack() {
        $audioPlayer.play();
        $isPlaying = true;
    }

    function pauseTrack() {
        $audioPlayer.pause();
        $isPlaying = false;
    }

    function loadTrack() {
        title = $audioTracks[$index].title;
        artist = $audioTracks[$index].artist;
        $audioPlayer.src = $audioTracks[$index].file;
        $audioPlayer.load();
    }

    function addAndPlayTrack() {
        addTrack({ title, artist, file });
        $index = $audioTracks.length - 1;
        // 		$currentTime = 0;
        // Load and play the new track
        loadTrack();
        playTrack();
    }
</script>

{#if controls}
    {#if $isPlaying === false}
        <button class="play-button controls" on:click={playTrack}>
            <PlayIcon size={iconSize} />
        </button>
    {:else if $isPlaying === true && ($status === "waiting" || $status === "loading" || $status === "can play some" || $status === "can play all")}
        <button class="play-button controls" on:click={pauseTrack}>
            <PlayIcon size={iconSize} />
        </button>
    {:else if $isPlaying === true}
        <button class="play-button controls" on:click={pauseTrack}>
            <PauseIcon size={iconSize} />
        </button>
    {/if}
{:else if track}
    {#if title !== $audioTracks[$index].title}
        <button class="play-button track" on:click={addAndPlayTrack}>
            <PlayIcon size={iconSize} />
        </button>
    {:else if title === $audioTracks[$index].title && $isPlaying === true && ($status === "loading" || $status === "can play some" || $status === "can play all" || $status === "waiting")}
        <button class="play-button track playing" on:click={pauseTrack}>
            <PlayIcon size={iconSize} />
        </button>
    {:else if title === $audioTracks[$index].title && $isPlaying === true}
        <button class="play-button track playing" on:click={pauseTrack}>
            <PauseIcon size={iconSize} />
        </button>
    {:else if title === $audioTracks[$index].title && $isPlaying === false}
        <button class="play-button track playing" on:click={playTrack}>
            <PlayIcon size={iconSize} />
        </button>
    {/if}
{/if}

<style>
    .play-button {
        margin: 0;
        padding: 0;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3rem;
        border: 1px solid #bbb;
    }

    .controls {
        width: 3rem;
        height: 3rem;
        border: 1px solid #000;
    }

    .track {
        width: 3rem;
        height: 3rem;
    }

    .playing {
        border: 1px solid #000;
    }
</style>
