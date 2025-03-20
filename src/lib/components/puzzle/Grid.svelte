<script lang="ts">
    import { writable } from 'svelte/store';
    import type { PuzzlePiece } from './utilites';

    const visible = true;
    const piecesPerSize = 3;
    let puzzle = writable<Array<PuzzlePiece | null>>(Array.apply(null, Array(Math.pow(piecesPerSize, 2))).map(() => null))
    console.log($puzzle)
</script>

{#if visible}
    <div class="fixed bottom-0 right-0 p-8" style="--peicentage:{Math.round(100 / piecesPerSize)}%">
        <div class="relative w-60 h-60 bg-gray-50 flex flex-wrap">
            {#each $puzzle.values() as piece}
            <div class="bg-blue-50 basis-[var(--peicentage)] h-[var(--peicentage)]">
                
            </div>
            {/each}
        </div>
    </div>
{/if}
