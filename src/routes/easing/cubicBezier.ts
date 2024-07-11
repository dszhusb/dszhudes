import type { Coord } from "$lib/store";
import { scaled_handle_one, scaled_handle_two } from "$lib/store";

function x(t: number, x1: number, x2: number, chart_size: number) {
    return (
        (Math.pow(1 - t, 3) * 0 +
            3 * Math.pow(1 - t, 2) * t * x1 +
            3 * (1 - t) * Math.pow(t, 2) * x2 +
            Math.pow(t, 3) * 1) *
        chart_size
    );
}

function y(t: number, y1: number, y2: number, chart_size: number) {
    return (
        (Math.pow(1 - t, 3) * 1 +
            3 * Math.pow(1 - t, 2) * t * y1 +
            3 * (1 - t) * Math.pow(t, 2) * y2 +
            Math.pow(t, 3) * 0) *
        chart_size
    );
}

export function plotCubic(p1: Coord, p2: Coord, chart_size: number, resolution: number) {
    let path = "";
    for (let t = 0; t <= 1.1; t += 1 / resolution) {
        path += `${x(t, p1.x, p2.x, chart_size)},${y(t, p1.y, p2.y, chart_size)} `;
    }
    return path;
}

export const cubicRawText = `
        //Given two control points (p1, p2) returns value
        function plotCubic(p1: Coord, p2: Coord, t) {
        t = Math.min(Math.max(t, 0), 1)
        const x = (Math.pow(1 - t, 3) 
                  * 0 + 3 * Math.pow(1 - t, 2) 
                  * t * p1.x + 3 * (1 - t) 
                  * Math.pow(t, 2) 
                  * p2.x + Math.pow(t, 3) * 1
        const y = (Math.pow(1 - t, 3) 
                  * 1 + 3 * Math.pow(1 - t, 2) 
                  * t * p1.y + 3 * (1 - t) 
                  * Math.pow(t, 2) 
                  * p2.y + Math.pow(t, 3) * 0
        return {x: x, y: y}
        }
        `