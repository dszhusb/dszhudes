<script lang="ts">
    export let fill: string;

    let color = "#292524";
    function handleMouseOver() {
        color = fill;
    }
    function handleMouseOut() {
        color = "#292524";
    }
</script>

<!-- 625 370 -->
<a
    href="/projects"
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
    on:focus={handleMouseOver}
    on:blur={handleMouseOut}
>
    <svg
        class="pt-4 pb-4 h-16 mx-auto"
        width="32"
        height="30"
        viewBox="0 0 570 442"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.7868 199.787C-2.92893 211.503 -2.92893 230.497 8.7868 242.213L199.706 433.132C211.421 444.848 230.416 444.848 242.132 433.132C253.848 421.416 253.848 402.421 242.132 390.706L72.4264 221L242.132 51.2944C253.848 39.5786 253.848 20.5837 242.132 8.86797C230.416 -2.84776 211.421 -2.84776 199.706 8.86797L8.7868 199.787ZM570 191L30 191V251L570 251V191Z"
            fill={color}
            role="button"
            tabindex="0"
        />
    </svg>
</a>

<style lang="postcss">
    svg:active {
        @apply border-0;
    }
</style>
