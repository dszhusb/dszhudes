<script lang="ts">
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import Grad from '$lib/assets/icons/grad.webp'
</script>

<div class="relative px-8 pb-8 pt-4">
    <img
        class="fade grayscale hover:grayscale-0 w-full border-solid border-[1px] border-stone-200"
        src={Grad}
        alt="icon"
    />
</div>
