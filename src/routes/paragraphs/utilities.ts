type Closest = {
    index: number,
    error: number
}

export const splitText = (str: string) => {
    return str.split(" ")
}

export const prefixWords = (words: string[]): number[] => {
    if (words.length > 0) {
        let prefix = [words[0].length]
        for (let i = 1; i < words.length; i++) {
            prefix.push(prefix[prefix.length - 1] + words[i].length)
        }
        return prefix
    }
    return [-1]
}

export const buildCircular = (text: string) => {
    const words = splitText(text)
    const prefix = prefixWords(words)
    const radius = seekCircleRadius(text.length)
    const paragraphs = approximateCircle(words, prefix, radius)
    return paragraphs
}

const approximateCircle = (words: string[], prefix: number[], radius: number) => {
    let paragraphs: string[] = []
    let left = 0, line = 1
    while (left <= words.length - 1) {
        const target = circleSegment(line, radius)
        const closest = nextClosest(words, prefix, target, left)
        paragraphs.push(words.slice(left, closest.index).join(" "))
        left = closest.index
        line++
    }
    return paragraphs
}

export const nextClosest = (words: string[], prefix: number[], target: number, left: number): Closest => {
    const base = prefix[left - 1] || 0
    let closest: number = Number.MAX_SAFE_INTEGER
    for (let i = left; i < words.length; i++) {
        const distance = prefix[i] - base
        const error = Math.abs(target - distance)
        if (error < closest) {
            closest = error
        } else {
            return <Closest>{ index: i - 1, error: closest }
        }
    }
    return <Closest>{ index: left, error: -1 }
}

export const seekCircleRadius = (length: number): number => {
    let maxTries = length / 2;
    let prev = Number.MAX_SAFE_INTEGER
    for (let r = 0; r < maxTries; r += 0.1) {
        const sum = circleSum(r)
        const diff = Math.abs(length - sum)
        if (diff > prev) {
            return r - 1
        }
        prev = diff
    }
    return -1
}

const circleSum = (r: number): number => {
    let sum = 0;
    for (let i = 1; i < r * 2; i++) {
        sum += circleSegment(i, r);
    }
    return sum;
}

const triangleSegment = (n: number, theta: number): number => {
    return 2 * n * Math.tan(theta)
}

const circleSegment = (n: number, r: number): number => {
    return 2 * Math.sqrt(r * r - Math.pow(n - r, 2))
}

export const double = (words: string[]): string[] => {
    if (words.length <= 1) {
        return words
    } else {
        return double(words.slice(0, Math.floor(words.length / 2))).concat([words.slice(Math.floor(words.length / 2)).join(" ")])
    }
}

export const pyramidize = (words: string[], angle: number, iteration: number = 0): string[] => {
    for (let i = 0; i < words.length; i++) {
        const segment = words.slice(i).join(" ")
        console.log(2 * iteration * Math.tan(angle))
        if (segment.length > iteration * Math.tan(angle)) {
            return pyramidize(words.slice(0, i), angle, iteration + 1).concat(segment)
        }
    }
    return [words.join(" ")]
}