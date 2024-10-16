<script context="module" lang="ts">
    import type { Picture } from "vite-imagetools";
    const modules: Record<string, { default: Picture }> = import.meta.glob(
        "$lib/assets/iconShells/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
        {
            eager: true,
            query: {
                enhanced: true,
            },
        },
    );
    const images = Object.fromEntries(
        Object.entries(modules).map((x) => [x[0], x[1].default]),
    );
</script>

<script lang="ts">
    import { fade } from "svelte/transition";
    import { hIcon, hColors } from "$lib/store";
</script>

<div
    class="w-full h-full min-h-screen flex items-center justify-center"
    transition:fade
    style:background-image={`linear-gradient(#ffffff, ${$hColors.f3})`}
>
    <enhanced:img
        class="spin max-w-64 saturate-150"
        src={images[`/src/lib/assets/iconShells/${$hIcon}.webp`]}
        alt="shell"
    />
</div>

<style>
    .spin {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg) scale(1.1);
        }
        3% {
            transform: rotate(10.8deg) scale(1);
        }
        30% {
            transform: rotate(108deg) scale(1);
        }
        33% {
            transform: rotate(118.8deg) scale(1.1);
        }
        36% {
            transform: rotate(129.6deg) scale(1);
        }
        63% {
            transform: rotate(226.8deg) scale(1);
        }
        66% {
            transform: rotate(237.6deg) scale(1.1);
        }
        69% {
            transform: rotate(248.4deg) scale(1);
        }
        97% {
            transform: rotate(349.2deg) scale(1);
        }
        100% {
            transform: rotate(360deg) scale(1.1); /* Reset size after full rotation */
        }
    }
</style>
