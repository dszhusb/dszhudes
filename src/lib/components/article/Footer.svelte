<script lang="ts">
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import { hIcon } from "$lib/store";

    function goTop() {
        document.body.scrollIntoView();
    }

    let tl = gsap.timeline({ repeat: 0 });
    onMount(() => {
        tl.to(".icon", { rotate: 60, duration: 0.5, ease: "power1" });
        tl.to(".icon", { rotate: 0, duration: 2, ease: "bounce" });
    });

    function trigger() {
        if (!tl.isActive) {
            tl.play(0);
        }
    }
</script>

<div class="relative w-full pt-24 flex flex-col items-center">
    <div class="absolute bottom-0 h-8 w-full bg-stone-800" />
    <button class="w-24 px-4 pt-2 bg-stone-800 rounded-t-full" on:click={goTop}>
        <img
            on:mouseover={trigger}
            on:focus={trigger}
            class="icon z-50 saturate-150"
            src={`/src/lib/assets/iconShells/${$hIcon}.webp`}
            alt="foot"
        />
    </button>
</div>

<style>
    button {
        @apply m-0;
    }
</style>
