import type { Coord } from "$lib/store";

export function x(t: number, x1: number, x2: number, chart_size: number) {
    return (Math.pow(1 - t, 3) * 0 +
        3 * Math.pow(1 - t, 2) * t * x1 +
        3 * (1 - t) * Math.pow(t, 2) * x2 +
        Math.pow(t, 3) * 1) *
        chart_size
}

export function y(t: number, y1: number, y2: number, chart_size: number) {
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

export function cubicPoints(p1: Coord, p2: Coord, resolution: number) {
    let points = []
    for (let t = 0; t <= 1.1; t += 1 / resolution) {

        points.push(<Coord>{ x: x(t, p1.x, p2.x, 1), y: y(t, p1.y, p2.y, 1) })
    }
    return points
}

export const cubicRawText = `
function x(t: number, x1: number, x2: number) {
    return (Math.pow(1 - t, 3) * 0 +
        3 * Math.pow(1 - t, 2) * t * x1 +
        3 * (1 - t) * Math.pow(t, 2) * x2 +
        Math.pow(t, 3) * 1)
}

function y(t: number, y1: number, y2: number) {
    return (Math.pow(1 - t, 3) * 1 +
        3 * Math.pow(1 - t, 2) * t * y1 +
        3 * (1 - t) * Math.pow(t, 2) * y2 +
        Math.pow(t, 3) * 0)
}

function cubicPoints(p1: Coord, p2: Coord, resolution: number) {
    let points = []
    for (let t = 0; t <= 1.1; t += 1 / resolution) {

        points.push(<Coord>{ x: x(t, p1.x, p2.x, 1), y: y(t, p1.y, p2.y, 1) })
    }
    return points
}
`

export const cubicSvelteText = `
const curve = cubicPoints( p1, p2, resolution)

function easeBezier(t: number): number {
    let y = 0;
    for (let i = 0; i < $curve.length; i++) {
        if ($curve[i].x <= t && t <= $curve[i + 1].x) {
            y = 1 - $curve[i].y;
        }
    }
    return y;
}
`
