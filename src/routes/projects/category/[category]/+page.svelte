<script lang="ts">
    import ProjectHeader from "$lib/components/article/ProjectHeader.svelte";
    import { page } from "$app/stores";
    import Posts from "$lib/components/nav/Posts.svelte";
    export let data;
</script>

<ProjectHeader />
{#key $page.url.pathname.split("/").at(-1)}
    <Posts {data} />
{/key}
