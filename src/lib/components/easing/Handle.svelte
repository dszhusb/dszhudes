<script lang="ts">
    import { hColors, handle_one, handle_two } from "$lib/store";
    import type { Coord } from "$lib/store";

    export let left = 0;
    export let top = 0;
    export let parentSize = 100;
    export let first = true;
    let moving = false;

    if (first) {
        left = $handle_one.x;
        top = $handle_one.y;
    } else {
        left = $handle_two.x;
        top = $handle_two.y;
    }

    function onMouseDown() {
        moving = true;
    }

    // function touchStart() {
    //     moving = true;
    // }

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            left = clamp(left + e.movementX, 0, parentSize);
            top = clamp(top + e.movementY, 0, parentSize);
            updateHandleStore(left, top);
        }
    }

    // function touchMove(e: TouchEvent) {
    //     if (moving) {
    //         const touch = e instanceof TouchEvent ? e.touches[0] : e;
    //         left = clamp(left + touch.clientX, 0, parentSize);
    //         top = clamp(top + touch.clientY, 0, parentSize);
    //     }
    // }

    function onMouseUp() {
        moving = false;
    }

    // function touchEnd() {
    //     moving = false;
    // }

    function clamp(n: number, min: number, max: number) {
        return Math.min(Math.max(n, min), max);
    }

    function updateHandleStore(x: number, y: number) {
        if (first) {
            handle_one.set(<Coord>{ x: x, y: y });
        } else {
            handle_two.set(<Coord>{ x: x, y: y });
        }
    }

    // 	$: console.log(moving);
</script>

<section
    role="button"
    tabindex="0"
    on:mousedown={onMouseDown}
    style="left: {left}px; top: {top}px;"
    class="absolute select-none cursor-move -translate-y-1/2 -translate-x-1/2"
>
    <div class="w-6 h-6 rounded-full" style:background-color={$hColors.text} />
</section>

<!-- on:touchstart={touchStart} -->

<svelte:window
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
/>

<!-- on:touchend={touchEnd}
on:touchmove={touchMove} -->