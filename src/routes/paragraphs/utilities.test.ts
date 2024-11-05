import { double, seekCircleRadius, buildCircular, nextClosest, splitText, prefixWords } from './utilities'
import { expect, test, vi } from 'vitest'

test("pyramidize", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    // const text = "o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o o"
    const paragraphs = buildCircular(text, 1)
    console.log(paragraphs)
})
