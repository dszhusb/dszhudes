import { seekCircleRadius, buildCircular, nextClosest, splitText, prefixWords } from './utilities'
import { expect, test, vi } from 'vitest'

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
const words = splitText(text)
const prefix = prefixWords(words)

test("next closest with ratio", async () => {
    let ratio = 0.5
    const left = 0
    const target = 20

    const closest = nextClosest(words, prefix, target, left, ratio)
    expect(closest.index === 6 && closest.error === 2)
})
