<script lang="ts">
    import { onMount } from "svelte";

    export function changeTheme(theme: theme) {
        document.documentElement.className = theme;
        localStorage.theme = theme;
    }

    onMount(() => {
        changeTheme(localStorage.getItem('theme') ?? window.matchMedia("(prefers-color-scheme : dark)").matches ? 'dark': 'light')
    })
</script>

<html lang="en">
    <slot />
</html>