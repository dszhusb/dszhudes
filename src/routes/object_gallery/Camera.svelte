<script lang="ts">
    import { forwardEventHandlers, T, useThrelte } from "@threlte/core";
    const { invalidate } = useThrelte();
    const el = document.getElementById("int-target");
    const component = forwardEventHandlers();
</script>

<T.PerspectiveCamera position={[5, 5, 5]} makeDefault let:ref>
    <T.OrbitControls
        bind:this={$component}
        args={[ref, el]}
        on:change={invalidate}
        enableZoom={false}
        autoRotate={true}
        maxPolarAngle={1.5}
    />
</T.PerspectiveCamera>
