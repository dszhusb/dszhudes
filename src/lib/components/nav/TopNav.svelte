<script>
    import { hColors } from "$lib/store";
</script>

<nav class="w-full border-b-[1px] border-stone-800 bg-white z-[100]">
    <ul class="p-4 pb-10 w-full">
        <li class="float-left px-4">
            <a href="/projects">DANIEL ZHU</a>
        </li>
        <li class="float-right px-4">
            <a href="/about" class={`hover:text-[${$hColors.text}]`}>ABOUT</a>
        </li>
        <li class="float-right px-4">
            <a href="/projects">WORK</a>
        </li>
    </ul>
</nav>