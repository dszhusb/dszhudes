<script lang="ts">
    import { hColors, colorSettings } from "$lib/store";
    import { tweened } from "svelte/motion";

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

<div class="flex h-4">
    <div class="w-full h-full" style:background-color={$cText} />
    <div class="w-full h-full" style:background-color={$c1} />
    <div class="w-full h-full" style:background-color={$c2} />
    <div class="w-full h-full" style:background-color={$c3} />
</div>
<div
    class="px-12 py-10 lg:px-24 lg:py-16 relative overflow-hidden bg-stone-50 flex flex-col gap-4"
>
    <h1
        class="font-thin text-4xl font-grotesk max-w-[60rem]"
        style:color={$cText}
    >
        Hi, I'm Daniel – designer, developer, and maker building digital and
        physical experiences.
    </h1>
    <h2 class="normal-case" style:color={$c1}>
        Check out my work below!
    </h2>
</div>
