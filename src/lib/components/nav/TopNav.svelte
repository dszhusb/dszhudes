<script>
    import { hColors } from "$lib/store";
</script>

<nav class="w-full bg-white z-[100] h-fit">
    <ul class="p-4 pb-10 w-full border-b-[1px] border-stone-800">
        <li class="float-left px-4">
            <a href="/">DANIEL ZHU</a>
        </li>
        <li class="float-right px-4">
            <a href="/about">ABOUT</a>
        </li>
        <li class="float-right px-4">
            <a href="/projects">WORK</a>
        </li>
    </ul>
    <ul
        class="w-full border-b-[1px] border-stone-800 bg-stone-800 flex flex-row place-content-evenly"
    >
        <li class="px-4 py-1">
            <a href="/easing" style:color={$hColors.f3}>Easing</a>
        </li>
        <li class="px-4 py-1">
            <a href="/shell" style:color={$hColors.f3}>Shells</a>
        </li>
        <li class="px-4 py-1">
            <a href="/handwriting" style:color={$hColors.f3}>Handwriting</a>
        </li>
    </ul>
</nav>

<style lang="postcss">
    a {
        @apply h-fit;
    }

    li {
        @apply h-fit;
    }

    ul {
        @apply h-fit;
    }
</style>
