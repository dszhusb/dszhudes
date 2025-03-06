<script lang="ts">
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import Portrait from "./Portrait.svelte";
    import resume from "$lib/assets/DanielZhu.pdf";
</script>

<svelte:head>
    <meta name="description" content="About Page" />
</svelte:head>

<main
    class="flex flex-col lg:flex-row divide-x-[1px] divide-stone-800 h-full w-full"
    style:background-image={`linear-gradient(#ffffff 50%,  var(--t50))`}
>
    <div
        class="about py-4 px-12"
        in:fly={{ duration: 500, opacity: 0.8, y: 100, easing: circOut }}
    >
        <h1 class="uppercase hover:-skew-x-6 duration-300">
            Hi, I'm Daniel Zhu
        </h1>
        <p>
            I'm a designer and creative technologist hailing from
            <a href="https://design.cmu.edu/content/environments-1">Design</a>,
            <a href="https://www.hcii.cmu.edu/">HCI</a>, and
            <a
                href="https://ideate.cmu.edu/undergraduate-programs/physical-computing/"
                >Physical Computing</a
            > at Carnegie Mellon University.
        </p>
        <p class="bg-example">
            As someone who has always had a curiosity and hunger to shape how
            things could be, I create physical and digital experiences that are
            memorable, unique and carefully considered.
        </p>
        <p>
            My education as a designer has helped me develop a framework to
            understand how people interact with other people, objects, and their
            environment. But it's never been enough for me to sketch and
            prototype. As a creative technologist, I've accumulated a broad
            suite of technical skills from web development, scripting, and code
            to electronics, 3D modeling, and physical making. One of my greatest
            strengths is the ability to evaluate and learn the technical skills
            I need on the fly to bring the concepts I dream of to life.
        </p>
        <p class="font-bold text-[var(--text)]">
            Send me an email if you'd like to work together!
        </p>
    </div>
    <div
        class="flex-initial lg:w-96 lg:h-screen overflow-hidden bg-white/25 relative"
        in:fly={{ duration: 500, opacity: 0.8, y: -50, easing: circOut }}
    >
        <Portrait />
        <div class="w-full h-full" />
    </div>
    <div
        class="flex-1"
        in:fly={{ duration: 500, opacity: 0.8, y: 25, easing: circOut }}
    >
        <div class="w-full divide-y-[1px] divide-stone-800 bg-stone-200">
            <a
                class="button inside bg-stone-800 text-stone-50"
                href={resume}
                target="_blank">Resume</a
            >
            <a
                href="http://www.linkedin.com/in/danielszhu"
                target="_blank"
                class="button text-stone-800 bg-[var(--c1)]"
                on:click={() => {}}>LinkedIn</a
            >
            <a
                href="https://github.com/dszhusb"
                target="_blank"
                class="button text-stone-800 bg-[var(--c2)]"
                on:click={() => {}}>Github</a
            >
            <a
                href="mailto:dszhu.design@gmail.com"
                target="_top"
                class="button text-stone-800 bg-[var(--c3)]"
                >dszhu.design@gmail.com</a
            >
            <div />
        </div>
    </div>
</main>

<style lang="postcss">
    h1 {
        @apply pt-2 pb-8;
    }
    p {
        @apply pb-6 max-w-md leading-relaxed;
    }

    p a {
        @apply text-[var(--text)];
    }
    .about a {
        @apply font-semibold;
    }
    .button {
        @apply w-full flex place-content-center uppercase p-4;
    }
</style>
