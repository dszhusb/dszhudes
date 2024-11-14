/* UNIVERSAL FUNCTIONS */

type Closest = {
    index: number,
    error: number
}

export const nextClosest = (words: string[], prefix: number[], target: number, left: number, ratio: number): Closest => {
    const initial = left;
    const base = prefix[left - 1] || 0
    let closest: number = Number.MAX_SAFE_INTEGER
    while (left < words.length) {
        const distance = (prefix[left] - base + left - initial) * ratio
        const error = Math.abs(target - distance)
        if (error < closest) {
            closest = error
        } else {
            return <Closest>{ index: left - 1, error: closest }
        }
        left++
    }
    const error = Math.abs(target - (prefix[prefix.length - 1] - base) * ratio)
    return <Closest>{ index: words.length - 1, error: error }
}

export const splitText = (str: string): string[] => {
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

/* CIRCLE FUNCTIONS */

export const buildCircular = (text: string, ratio: number): string[] => {
    const words = splitText(text)
    const prefix = prefixWords(words)
    const radius = seekCircleRadius(text.length * ratio)

    let paragraphs: string[] = []
    let best = Number.MAX_SAFE_INTEGER;
    const searchRange = 2, searchDetail = 0.1;
    for (let i = -searchRange; i < searchRange; i += searchDetail) {
        const approximation = approximateCircle(words, prefix, radius + i, ratio)
        if (approximation.error < best) {
            best = approximation.error
            paragraphs = approximation.paragraphs
        }
    }

    return paragraphs
}

const approximateCircle = (words: string[], prefix: number[], radius: number, ratio: number) => {
    let paragraphs: string[] = []
    let left = 0, line = 1, count = 0, error = 0
    while (left <= words.length - 1 && count < 100 && line < 2 * radius) {
        const target = circleSegment(line, radius)
        const closest = nextClosest(words, prefix, target, left, ratio)
        const phrase = words.slice(left, closest.index + 1).join(" ")
        error += Math.abs(phrase.length * ratio - target)
        paragraphs.push(phrase)
        left = closest.index + 1
        line++
        count++
    }

    if (left < words.length) {
        const phrase = words.slice(left).join(" ")
        paragraphs.push(phrase)
        error += phrase.length
    }

    return { paragraphs: paragraphs, error: error }
}

export const seekCircleRadius = (length: number): number => {
    let maxTries = length / 2;
    let prev = Number.MAX_SAFE_INTEGER;
    for (let r = 0; r < maxTries; r += 0.25) {
        const sum = circleSum(r);
        const diff = Math.abs(length - sum);
        if (diff > prev) {
            return r - 0.25;
        }
        prev = diff;
    }
    return -1;
}

const circleSum = (r: number): number => {
    let sum = 0;
    for (let i = 1; i < r * 2; i++) {
        sum += circleSegment(i, r);
    }
    return sum;
}

const circleSegment = (n: number, r: number): number => {
    return 2 * Math.sqrt(r * r - Math.pow(n - r, 2))
}

/* TRIANGLE FUNCTIONS */

export const buildTriangular = (text: string, ratio: number): string[] => {
    const words = splitText(text)
    const prefix = prefixWords(words)

    let paragraphs: string[] = []
    let best = Number.MAX_SAFE_INTEGER;
    const increment = Math.PI / 12
    for (let i = increment; i < Math.PI / 2 - increment; i += increment) {
        const approximation = approximateTriangle(words, prefix, i, ratio)
        if (approximation.error < best) {
            best = approximation.error
            paragraphs = approximation.paragraphs
        }
    }

    return paragraphs
}

const approximateTriangle = (words: string[], prefix: number[], theta: number, ratio: number) => {
    let paragraphs: string[] = []
    let left = 0, line = 1, count = 0, error = 0
    while (left <= words.length - 1 && count < 100) {
        const target = triangleSegment(line, theta) * ratio
        const closest = nextClosest(words, prefix, target, left, ratio)
        const phrase = words.slice(left, closest.index + 1).join(" ")
        error += Math.abs(phrase.length - target)
        paragraphs.push(phrase)
        left = closest.index + 1
        line++
        count++
    }

    if (left < words.length) {
        const phrase = words.slice(left).join(" ")
        paragraphs.push(phrase)
    }

    return { paragraphs: paragraphs, error: error }
}

const triangleSegment = (n: number, theta: number): number => {
    return 2 * n * Math.tan(theta)
}

/* SQUARE FUNCTIONS */

export const buildSquare = (text: string, ratio: number): string[] => {
    const words = splitText(text)
    const prefix = prefixWords(words)

    let paragraphs: string[] = []
    let best = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < text.length; i += 1) {
        const approximation = approximateSquare(words, prefix, i, ratio)
        const error = approximation.error + Math.abs(approximation.paragraphs.length - i)
        if (error < best) {
            best = error
            paragraphs = approximation.paragraphs
        }
    }

    return paragraphs
}

const approximateSquare = (words: string[], prefix: number[], length: number, ratio: number) => {
    let paragraphs: string[] = []
    let left = 0, line = 1, count = 0, error = 0
    while (left <= words.length - 1 && count < 100) {
        const closest = nextClosest(words, prefix, length, left, ratio)
        const phrase = words.slice(left, closest.index + 1).join(" ")
        error += phrase.length
        paragraphs.push(phrase)
        left = closest.index + 1
        line++
        count++
    }

    if (left < words.length) {
        const phrase = words.slice(left).join(" ")
        paragraphs.push(phrase)
        error += Math.abs(phrase.length * ratio - length)
    }

    return { paragraphs: paragraphs, error: error }
}