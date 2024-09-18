import type { Coord } from "$lib/store";
import { scaled_handle_one, scaled_handle_two } from '$lib/store'

export function x(t: number, x1: number, x2: number, chart_size: number) {
    return (Math.pow(1 - t, 3) * 0 +
        3 * Math.pow(1 - t, 2) * t * x1 +
        3 * (1 - t) * Math.pow(t, 2) * x2 +
        Math.pow(t, 3) * 1) *
        chart_size
}

function y(t: number, y1: number, y2: number, chart_size: number) {
    return (Math.pow(1 - t, 3) * 1 +
        3 * Math.pow(1 - t, 2) * t * y1 +
        3 * (1 - t) * Math.pow(t, 2) * y2 +
        Math.pow(t, 3) * 0) *
        chart_size
}

export function plotCubic(p1: Coord, p2: Coord, chart_size: number, resolution: number) {
    let path = "";
    for (let t = 0; t <= 1.1; t += 1 / resolution) {
        path += `${x(t, p1.x, p2.x, chart_size)},${y(t, p1.y, p2.y, chart_size)} `;
    }
    return path;
}

export const cubicRawText = `
function y(t: number, y1: number, y2: number) {
    return Math.pow(1 - t, 3) * 1 +
        3 * Math.pow(1 - t, 2) * t * y1 +
        3 * (1 - t) * Math.pow(t, 2) * y2 +
        Math.pow(t, 3) * 0)
}
`