<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { hIcon } from '$lib/store'
    import TopNav from "$lib/components/nav/TopNav.svelte";
    import Sidebar from "$lib/components/nav/Sidebar.svelte";
    import SideDisp from "$lib/components/nav/SideDisp.svelte";
</script>

<svelte:head>
    <link rel="icon" type="image/webp" href="/src/lib/assets/iconShells/{$hIcon}.webp" />
</svelte:head>

<main class="font-mono flex flex-col md:flex-row">
    <div
        class="block md:hidden"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >
        <TopNav />
    </div>
    <div
        class="hidden md:flex"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >
        <Sidebar />
        <SideDisp />
    </div>
    <div class="w-full">
        <slot></slot>
    </div>
</main>

<style>
    div[aria-current="page"] {
        @apply hidden;
    }
</style>
