<script lang="ts">
    import { hColors } from "$lib/store";
    import { circularizeText } from "./utilities";
    import { PhysicsBody } from "./utilities";
    import { scale } from "svelte/transition";
    import { elasticOut } from "svelte/easing";
    import { writable } from "svelte/store";
    export let thought = "";
    const paragraphs = circularizeText(thought);

    export let activated = false;
    let body = writable<PhysicsBody>(
        new PhysicsBody(
            <Vector>{ x: Math.random() * 100, y: Math.random() * 100 },
            <Vector>{ x: 10, y: 0 },
            <Vector>{ x: 0, y: 0 },
            1,
        ),
    );

    let moving = false;

    function onMouseDown() {
        moving = true;
    }

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            $body.accelerateByPoint(<Vector>{
                x: e.movementX / 100,
                y: e.movementY / 100,
            });
        }
    }

    function onMouseUp() {
        moving = false;
    }

    setInterval(() => {
        body.set($body.calculate(50));
    }, 50);
</script>

{#if activated}
    <div
        transition:scale={{
            duration: 1000,
            start: 0,
            opacity: 0.5,
            easing: elasticOut,
        }}
        role="button"
        tabindex={0}
        on:mousedown={onMouseDown}
        style:left={`${$body.position.x}px`}
        style:top={`${$body.position.y}px`}
        class="draggable bubble"
    >
        {#each paragraphs as para}
            {#if para.length > 0}
                <p class="w-full">{para}</p>
            {/if}
        {/each}
    </div>
{/if}

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="postcss">
    .draggable {
        user-select: none;
        cursor: move;
        position: absolute;
        z-index: 9999;
    }

    .bubble {
        @apply rounded-full border-[1px] border-white text-white backdrop-blur bg-stone-800/40;
        @apply p-12 flex items-center flex-col justify-center text-center aspect-square;
    }
</style>
