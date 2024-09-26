<script lang="ts">
    import { hColors } from "$lib/store";
    import ExperimentBlock from "$lib/components/nav/ExperimentBlock.svelte";
</script>

<div
    class="w-full h-full"
    style:background-image={`linear-gradient(#ffffff 30%, ${$hColors.f3}50)`}
>
    <div class="px-12 py-8">
        <h2 class="max-w-3xl text-stone-500">
            The following is a series of web experiments I've been working on in
            my spare time just having fun exploring interaction on the internet!
        </h2>
    </div>
    <ul class="w-full h-auto flex flex-wrap p-12 gap-x-[6%] gap-y-12">
        <ExperimentBlock
            title="Article Experiment"
            link="handwriting"
            image="handwriting"
            description="An exploration of mediums of expression writing, handwriting, and speaking – combining all three into a single cohesive experience through the web."
        />
        <ExperimentBlock
            title="Ceramic Gallery"
            link="object_gallery"
            image="ceramics"
            description="A 3D gallery providing a glimpse into my ceramic collection and the stories behind each piece. Made through photogrammetry, Three.js, and more."
        />
        <ExperimentBlock
            title="Easing Experiment"
            link="easing"
            image="bezierEasing"
            description="A Sveltekit visualization and implementation of cubic bezier easing. Create your own curve and explore it's effects on svelte transitions in real time!"
        />
        <ExperimentBlock
            title="Shell Generator"
            link="shell"
            image="shellGenerator"
            description="The engine behind the shell theme and color palettes of this site. Built from formulas modeling real shells and a little creative interpretation along the way."
        />
    </ul>
</div>
