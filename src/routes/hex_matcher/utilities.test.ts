import { getColorFromDate } from '$lib/components/color/utilities'
import { expect, test, vi } from 'vitest'

test("Test Date Hash", async () => {
    const d1 = new Date("2024-10-25")
    const c1 = getColorFromDate(d1)

    const d2 = new Date("2024-10-26")
    const c2 = getColorFromDate(d2)

    const d3 = new Date("2024-10-27")
    const c3 = getColorFromDate(d3)

    const deviation = diff([c1, c2, c3])
    console.log(c1, c2, c3)
    expect(deviation >= 100)
})

const diff = (colors: RgbColor[]) => {
    let sumColor: RgbColor = { r: 0, g: 0, b: 0 }

    for (let color of colors) {
        sumColor.r += color.r
        sumColor.g += color.g
        sumColor.b += color.b
    }

    const averageColor = { r: sumColor.r /= colors.length, g: sumColor.g /= colors.length, b: sumColor.b /= colors.length }

    let deviation = 0
    for (let color of colors) {
        deviation += Math.abs(averageColor.r - color.r)
        deviation += Math.abs(averageColor.g - color.g)
        deviation += Math.abs(averageColor.b - color.b)
    }
    return deviation / colors.length
}