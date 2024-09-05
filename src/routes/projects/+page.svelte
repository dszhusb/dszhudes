<script lang="ts">
    import ProjectHeader from '$lib/components/article/ProjectHeader.svelte'
    import Posts from "$lib/components/nav/Posts.svelte";
    export let data;
</script>

<ProjectHeader />
<Posts {data} />
