import { onMount } from "svelte";

export default function (callback: Function, timeout: number) {
    let interval: number

    const resetInterval = () => {
        clearInterval(interval)
        interval = setInterval(callback, timeout)
    }

    onMount(() => {
        resetInterval()
        return () => clearInterval(interval)
    })

    return resetInterval
}