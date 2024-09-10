<script lang="ts">
    import ProjectHeader from "$lib/components/article/ProjectHeader.svelte";
    import { page } from "$app/stores";
    import Posts from "$lib/components/nav/Posts.svelte";
    export let data;
</script>

<ProjectHeader />
{#key $page.params.category}
    <Posts {data} />
{/key}
