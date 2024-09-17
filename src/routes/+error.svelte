<script lang="ts">
    import { page } from "$app/stores";
    import { hColors } from "$lib/store";

    let message = "Error Message";
    page.subscribe((p) => {
        if (p.error != null) {
            message = p.error.message;
        }
    });
</script>

<div
    class="w-full h-screen p-16 flex flex-col gap-y-4"
    style:background-image={`linear-gradient(#ffffff, ${$hColors.f2})`}
>
    <h1 class="uppercase font-thin text-4xl">
        {$page.status}: {message}
    </h1>
    <a href="/projects">Back to Home</a>
</div>
