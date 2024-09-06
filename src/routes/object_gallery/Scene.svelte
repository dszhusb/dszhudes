<script lang="ts">
    import { T, useThrelte } from "@threlte/core";
    import { Suspense, Environment, transitions } from "@threlte/extras";
    import { cIndex } from "$lib/store";
    import Camera from "./Camera.svelte";

    import CloverCup from "$lib/assets/ceramics/cloverCup.svelte";
    import FlowerCup from "$lib/assets/ceramics/FlowerCup.svelte";
    import PeaPot from "$lib/assets/ceramics/PeaPot.svelte";
    import MottledPot from "$lib/assets/ceramics/mottledPot.svelte";
    import RedCup from "$lib/assets/ceramics/redCup.svelte";
    import TriToneHolder from "$lib/assets/ceramics/triToneHolder.svelte";
    import PaleLotus from "$lib/assets/ceramics/paleLotus.svelte";

    const { renderer, invalidate } = useThrelte();
    $: {
        renderer.toneMappingExposure = 1;
        invalidate();
    }

    let index = $cIndex;
    cIndex.subscribe((v) => {
        index = v;
    });

    transitions();
</script>

<!-- <Grid /> -->
<Camera />
<Suspense>
    {#if index === 0}
        <CloverCup />
    {/if}
    {#if index === 1}
        <FlowerCup />
    {/if}
    {#if index === 2}
        <PeaPot />
    {/if}
    {#if index === 3}
        <MottledPot />
    {/if}
    {#if index === 4}
        <RedCup />
    {/if}
    {#if index === 5}
        <TriToneHolder />
    {/if}
    {#if index === 6}
        <PaleLotus />
    {/if}
</Suspense>
<T.AmbientLight intensity={6} color="#fffceb" />
<T.DirectionalLight position={[1, 5, 2]} intensity={1} />
