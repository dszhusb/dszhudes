<script lang="ts">
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import ExperimentBlock from "$lib/components/nav/ExperimentBlock.svelte";
</script>

<div
    class="w-full h-full"
    style:background-image={`linear-gradient(#ffffff 30%, var(--t50))`}
>
    <div
        class="px-12 py-8"
        in:fly={{ duration: 500, opacity: 0.8, x: 100, easing: circOut }}
    >
        <h2 class="max-w-3xl text-stone-600">
            The following is a series of web experiments I've been working on in
            my spare time just having fun exploring interaction on the internet!
        </h2>
    </div>
    <ul
        class="w-full h-auto flex flex-wrap p-12 gap-x-[6%] gap-y-12"
        in:fly={{ duration: 500, opacity: 0.8, y: 100, easing: circOut }}
    >
        <ExperimentBlock
            title="Easing Experiment"
            link="easing"
            image="bezierEasing"
            description="A Sveltekit visualization and implementation of cubic bezier easing. Create your own curve and explore it's effects on svelte transitions in real time!"
        />
        <ExperimentBlock
            title="Article Experiment"
            link="handwriting"
            image="handwriting"
            description="An exploration of mediums of expression writing, handwriting, and speaking – combining all three into a single cohesive experience through the web."
        />
        <ExperimentBlock
            title="Shell Generator"
            link="shell"
            image="shellGenerator"
            description="The engine behind the shell theme and color palettes of this site. Built from formulas modeling real shells and a little creative interpretation along the way."
        />
        <ExperimentBlock
            title="Hex Matcher"
            link="hex_matcher"
            image="hex_matcher"
            description="Fancy yourself a designer with a keen eye? Try your hand at matching
            the given hexcode color with rgb, hsl, and cmyk."
        />
        <ExperimentBlock
            title="Ceramic Gallery"
            link="object_gallery"
            image="ceramics"
            description="A 3D gallery providing a glimpse into my ceramic collection and the stories behind each piece. Made through photogrammetry, Three.js, and more."
        />
        <ExperimentBlock
            title="Media Tapestry"
            link="media"
            image="media"
            description="A collection of some of the media I love including music from Spotify's API and others."
        />
        <ExperimentBlock
            title="Shaped Paragraphs"
            link="paragraphs"
            image="paragraphs"
            description="Developing line splitting algorithms that make any given paragraph resemble a given shape by adjusting the rag."
        />
    </ul>
</div>
