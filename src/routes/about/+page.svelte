<script lang="ts">
    import { tweened } from "svelte/motion";
    import { hColors, colorSettings } from "$lib/store";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import Headshot from "$lib/assets/icons/headshot.webp";
    import resume from "$lib/assets/DanielZhu.pdf";

    const c1 = tweened($hColors.f1, colorSettings);
    const c2 = tweened($hColors.f2, colorSettings);
    const c3 = tweened($hColors.f3, colorSettings);
    const cText = tweened($hColors.text, colorSettings);
    hColors.subscribe((value) => {
        c1.set(value.f1);
        c2.set(value.f2);
        c3.set(value.f3);
        cText.set(value.text);
    });
</script>

<main
    class="flex flex-col lg:flex-row divide-x-[1px] divide-stone-800 h-full w-full"
    in:fly={{ duration: 300, opacity: 0.8, x: 200, easing: circOut }}
>
    <div class="about py-4 px-12">
        <h1 class="uppercase hover:-skew-x-6 duration-300">
            Hi, I'm Daniel Zhu
        </h1>
        <p>
            I'm a designer and creative technologist hailing from
            <a
                style:color={$cText}
                href="https://design.cmu.edu/content/environments-1">Design</a
            >,
            <a style:color={$cText} href="https://www.hcii.cmu.edu/">HCI</a>,
            and
            <a
                style:color={$cText}
                href="https://ideate.cmu.edu/undergraduate-programs/physical-computing/"
                >Physical Computing</a
            > at Carnegie Mellon University.
        </p>
        <p>
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
        <p class="font-bold" style:color={$hColors.text}>
            Send me an email if you'd like to work together!
        </p>
    </div>
    <div
        class="flex-initial lg:w-96 divide-y-[1px] divide-stone-800 lg:h-screen overflow-hidden bg-stone-200 relative"
    >
        <img
            class="w-full duration-1000"
            src={Headshot}
            alt="portrait"
        />
    </div>
    <div class="flex-1">
        <div class="w-full divide-y-[1px] divide-stone-800 bg-stone-200">
            <a
                class="button inside bg-stone-800 text-stone-50"
                href={resume}
                target="_blank">Resume</a
            >
            <a
                href="http://www.linkedin.com/in/danielszhu"
                target="_blank"
                style:background-color={$c1}
                class="button text-stone-800"
                on:click={() => {}}>LinkedIn</a
            >
            <a
                href="https://github.com/dszhusb"
                target="_blank"
                style:background-color={$c2}
                class="button text-stone-800"
                on:click={() => {}}>Github</a
            >
            <a
                href="mailto:dszhu.design@gmail.com"
                target="_top"
                style:background-color={$c3}
                class="button text-stone-800">dszhu.design@gmail.com</a
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
    .about a {
        @apply font-semibold;
    }
    .button {
        @apply w-full flex place-content-center uppercase p-4;
    }
</style>
