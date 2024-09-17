<script lang="ts">
    import Youtube from "svelte-youtube-embed";
    import PlayIcon from "$lib/components/audio/PlayIcon.svelte";
    export let url: string;
</script>

<div class="my-16 border-t-[1px] border-b-[1px] border-stone-800">
    <Youtube
        id={url}
        animations={false}
        --title-color="rgb(0,0,0,0)"
        --title-shadow-color="rgb(0,0,0,0)"
    >
        <button class="bg-white p-4 rounded-full mix-blend-exclusion">
            <PlayIcon size={2} />
        </button>
    </Youtube>
</div>
