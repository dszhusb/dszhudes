<script>
    import { hColors } from "$lib/store";
</script>

<nav class="w-full bg-white z-[100]">
    <ul
        class="p-2 w-full pb-8 border-b-[1px] border-stone-800"
        style:background-color={$hColors.f3}
    >
        <li class="float-left px-4">
            <a href="/easing">Easing</a>
        </li>
        <li class="float-left px-4">
            <a href="/shell">Shells</a>
        </li>
        <li class="float-left px-4">
            <a href="/handwriting">Handwriting</a>
        </li>
    </ul>
    <ul class="p-4 pb-10 w-full border-b-[1px] border-stone-800">
        <li class="float-left px-4">
            <a href="/">DANIEL ZHU</a>
        </li>
        <li class="float-right px-4">
            <a href="/about" class={`hover:text-[${$hColors.text}]`}>ABOUT</a>
        </li>
        <li class="float-right px-4">
            <a href="/projects">WORK</a>
        </li>
    </ul>
</nav>
