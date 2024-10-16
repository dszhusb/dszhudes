<script lang="ts">
    import { hColors } from "$lib/store";
    import { slide } from "svelte/transition";
    import { circOut } from "svelte/easing";

    let showFun = false;
    let y: number = 0;
    let py: number = 0;

    function handleScroll() {
        if (py != y) {
            showFun = false;
        }
        py = y;
    }

    $: y, handleScroll();
</script>

<svelte:window bind:scrollY={y} />

<nav class="w-full bg-white h-fit">
    <ul class="p-4 pb-10 w-full border-b-[1px] border-stone-800">
        <li class="float-left px-4 uppercase">
            <a href="/">Daniel Zhu</a>
        </li>
        <li class="float-right px-4">
            <button on:click={() => (showFun = !showFun)} class="uppercase"
                >Fun</button
            >
        </li>
        <li class="float-right px-4 uppercase">
            <a href="/about">About</a>
        </li>
        <li class="float-right px-4 uppercase">
            <a href="/projects">Work</a>
        </li>
    </ul>
    {#if showFun}
        <ul
            class="w-full border-b-[1px] border-stone-800 flex flex-wrap place-content-evenly uppercase absolute"
            transition:slide={{ duration: 300, easing: circOut }}
        >
            <li
                class="w-full border-b-[1px] border-stone-800 bg-white"
            >
                <div
                    class="px-4 py-4 w-full text-center"
                    style:background-color={`${$hColors.f1}D0`}
                >
                    <a href="/shell" class="text-stone-800">Shells</a>
                </div>
            </li>
            <li class="w-full border-b-[1px] border-stone-800">
                <div
                    class="px-4 py-4 w-full text-center"
                    style:background-color={`${$hColors.f2}`}
                >
                    <a href="/handwriting" class="text-stone-800">Handwriting</a
                    >
                </div>
            </li>
            <li class="w-full border-b-[1px] border-stone-800">
                <div
                    class="px-4 py-4 w-full text-center"
                    style:background-color={`${$hColors.f3}`}
                >
                    <a href="/media" class="text-stone-800">Media Tapestry</a>
                </div>
            </li>
            <li
                class="w-full p-2 bg-white/50 text-stone-800 text-center lowercase font-mono backdrop-blur-sm"
            >
                <p>more on desktop...</p>
            </li>
        </ul>
    {/if}
</nav>

<style lang="postcss">
    a {
        @apply h-fit;
    }

    li {
        @apply h-fit;
    }

    ul {
        @apply h-fit;
    }
</style>
