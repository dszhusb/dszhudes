<!-- Work Page -->
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
    import { gsap } from "gsap";
    import { onMount } from "svelte";

    interface Shell {
        id: Picture;
        size: number;
    }

    const shells: Shell[] = [];
    for (let i = 0; i < 50; i++) {
        shells.push({
            id: images[`/src/lib/assets/iconShells/${i % 23}.webp`],
            size: Math.random() * 2 + 10,
        });
    }

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    onMount(() => {
        for (let i = 0; i < 4; i++) {
            tl.to(".shell", {
                top: "random(0, 100, 1)%",
                left: "random(0, 100, 1)%",
                rotate: "random(-360, 360, 1)",
                duration: "random(4,5,0.1)",
                ease: "elastic",
            });
        }

        tl.to(".shell", {
            top: "50%",
            left: "50%",
            rotate: 0,
            duration: "random(3,5,0.1)",
            ease: "elastic",
        });
    });
</script>

<main
    class="relative w-screen h-screen overflow-hidden bg-white"
>
    {#each shells as s}
        <enhanced:img
            src={s.id}
            style:width={`${s.size}rem`}
            class="shell"
            alt="shell"
        />
    {/each}

    <a
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference text-center border-white"
        href="/projects"
    >
        <div class="flex flex-col md:flex-row md:gap-8 mb-4 md:mb-0">
            <div class="title">Daniel</div>
            <div class="title">Zhu</div>
        </div>
        <div class="place-content-center flex flex-row gap-4 items-center">
            <svg
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.75"
                stroke="white"
                class="size-8"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
            </svg>
            <div class="text-white text-4xl font-light font-mono uppercase">
                Enter Site
            </div>
        </div>
    </a>
</main>

<style lang="postcss">
    img {
        @apply absolute saturate-150 hover:saturate-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
    }

    .title {
        @apply text-white text-8xl md:text-9xl font-medium uppercase tracking-tight font-grotesk leading-[6rem] md:leading-tight;
    }
</style>
