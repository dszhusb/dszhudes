<script lang="ts">
    import ProjectHeader from "$lib/components/article/ProjectHeader.svelte";
    import { page } from "$app/stores";
    import Posts from "$lib/components/nav/Posts.svelte";
    export let data;
</script>

<svelte:head>
	<meta name="description" content="All Project Work" />
</svelte:head>

<ProjectHeader />
<Posts {data} />
