<script lang="ts">
    import { hColors } from "$lib/store";
    import Grad from "$lib/assets/icons/grad.webp";
</script>

<main class="flex flex-col lg:flex-row divide-x-[1px] divide-stone-800 h-full">
    <div
        class="flex-initial lg:w-96 divide-y-[1px] divide-stone-800 lg:h-screen overflow-hidden bg-stone-200"
    >
        <img class="w-full" src={Grad} alt="portrait" />
        <img
            class="w-full contrast-50 grayscale hidden lg:inline"
            src={Grad}
            alt="portrait"
        />
    </div>
    <div class="about flex-1 py-4 px-12">
        <h1 class="uppercase">Hi, I'm Daniel Zhu</h1>
        <p>
            I'm a newly graduated designer and creative technologist who studied
            <a
                style:color={$hColors.text}
                href="https://design.cmu.edu/content/environments-1">Design</a
            >,
            <a style:color={$hColors.text} href="https://www.hcii.cmu.edu/"
                >HCI</a
            >, and
            <a
                style:color={$hColors.text}
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
        <p class="uppercase text-xl text-stone-800">
            <b
                >Send me an email to dszhu.design@gmail.com to see what I'm
                currently working on bringing to life!</b
            >
        </p>
    </div>
    <div
        class="flex-initial lg:w-64 divide-y-[1px] divide-stone-800 bg-stone-200"
    >
        <a
            class="button inside bg-stone-800 text-stone-50"
            href="/src/lib/assets/DanielZhu.pdf"
            target="_blank">Resume</a
        >
        <a
            href="http://www.linkedin.com/in/danielszhu"
            target="_blank"
            style:background-color={$hColors.f1}
            class="button text-stone-800"
            on:click={() => {}}>LinkedIn</a
        >
        <a
            href="https://github.com/dszhusb"
            target="_blank"
            style:background-color={$hColors.f2}
            class="button text-stone-800"
            on:click={() => {}}>Github</a
        >
        <a
            href="mailto:dszhu.design@gmail.com"
            target="_top"
            style:background-color={$hColors.f3}
            class="button text-stone-800">Email</a
        >
        <div />
    </div>
</main>

<style>
    h1 {
        @apply pt-2 pb-8;
    }
    p {
        @apply pb-6 max-w-md leading-relaxed;
    }
    .about a {
        @apply font-semibold;
    }
    b {
        @apply font-bold;
    }
    .button {
        @apply w-full flex place-content-center uppercase p-4;
    }
</style>
