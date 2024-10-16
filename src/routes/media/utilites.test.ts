import { render, screen } from '@testing-library/svelte'
import { getClosestHeight, circleHeight, unitCircleHeight, circularizeText, numLinesForCircle, prefixWords } from './utilities'
import { expect, test, vi } from 'vitest'

// test("getCircleHeight", async () => {
//     const left = 4
//     const prefix = [2, 8, 16, 32, 64, 70, 71, 93, 100]
//     const target = 10

//     const closest = getClosestHeight(left, prefix, target)
//     expect(closest).toEqual(7)
// })

// test("circleHeight", async () => {
//     const r = 9;
//     let list = []
//     for (let i = 0.5; i < r; i++) {
//         list.push(circleHeight(i, r))
//     }
// })

test("circularize", async () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const words = text.split(' ')
    const prefix = prefixWords(words)
    const ratio = 1
    const a = words.join("").length * ratio
    const r = Math.sqrt(a / Math.PI)

    let t = 0
    let index = 0
    for (let i = 0.5; i <= 2 * r; i++) {
        const target = circleHeight(i, r * 2)
        t += target
        const targetIndex = getClosestHeight(index, prefix, target)
        const v = words.slice(index, targetIndex).join(" ")
        console.log(v)
        index = targetIndex
    }
})

