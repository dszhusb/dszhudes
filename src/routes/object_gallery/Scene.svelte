<script lang="ts">
    import { T, useThrelte } from "@threlte/core";
    import { Suspense, Grid } from "@threlte/extras";
    import { transitions } from "@threlte/extras";
    import { cIndex } from "$lib/store";
    import Camera from "./Camera.svelte";

    import CloverCup from "$lib/assets/ceramics/cloverCup.svelte";
    import FlowerCup from "$lib/assets/ceramics/FlowerCup.svelte";
    import PeaPot from "$lib/assets/ceramics/PeaPot.svelte";

    const { renderer, invalidate } = useThrelte();
    $: {
        renderer.toneMappingExposure = 1;
        invalidate();
    }

    let index = $cIndex;
    cIndex.subscribe((v) => {
        console.log(v);
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
</Suspense>
<T.AmbientLight intensity={1} />
<T.DirectionalLight position={[1, 2, 5]} />
