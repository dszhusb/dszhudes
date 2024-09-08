<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { createTransition } from "@threlte/extras";
    import type { Mesh } from "three";
    import type * as THREE from "three";
    import { cubicOut } from "svelte/easing";
    import { Group } from "three";

    export const ref = new Group();
    let mesh: THREE.Mesh;

    useTask((delta) => {
        if (!mesh) return;
        mesh.rotation.y += delta * 5;
    });

    const scale = createTransition<Mesh>((ref) => {
        return {
            tick(t) {
                // t is [0,1] and needs to be converted to [0.5,1]
                t = 0.5 + t;
                ref.scale.set(t, t, t);
            },
            easing: cubicOut,
            duration: 100,
        };
    });
</script>

<T is={ref} dispose={false}>
    <T.Mesh bind:ref={mesh} in={scale} out={scale}>
        <T.BoxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <T.MeshBasicMaterial color="black" wireframe={true} />
    </T.Mesh>
</T>
