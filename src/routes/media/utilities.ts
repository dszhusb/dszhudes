export function getSongBlurbMap(blurbs: MusicBlurb[]): Map<string, MusicBlurb> {
    let map = new Map<string, MusicBlurb>()
    for (let blurb of blurbs) {
        map.set(blurb.id, blurb)
    }
    return map
}

export function mixLists(a: any[], b: any[]) {
    let res: any[] = []
    let index = 0
    while (index < a.length && index < b.length) {
        res.push(a[index])
        res.push(b[index])
        index++
    }

    for (let i = index; i < a.length; i++) {
        res.push(a[i])
    }

    for (let i = index; i < b.length; i++) {
        res.push(b[i])
    }

    return shuffle(res)
}

export function shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}


export function isBook(item: Book | SpotifySong): item is Book {
    return (item as Book).author !== undefined;
}

export function isSpotifySong(item: Book | SpotifySong): item is SpotifySong {
    return (item as SpotifySong).added_at !== undefined;
}

export class PhysicsBody {
    position: Vector
    velocity: Vector
    acceleration: Vector
    mass: number
    damping = 0.5

    constructor(p: Vector = { x: 0, y: 0 }, v: Vector = { x: 0, y: 0 }, a: Vector = { x: 0, y: 0 }, m: number) {
        this.position = p
        this.velocity = v
        this.acceleration = a
        this.mass = m
    }

    accelerateByPoint(target: Vector) {
        this.acceleration.x = target.x - this.position.x
        this.acceleration.y = target.y - this.position.y
    }

    calculate(t: number) {
        this.velocity.x = this.velocity.x + this.acceleration.x * t
        this.velocity.y = this.velocity.y + this.acceleration.y * t
        this.position.x = this.position.x + this.velocity.x * t
        this.position.y = this.position.y + this.velocity.y * t

        return this
    }
}

export function circularizeText(text: string, ratio: number = 1) {
    const words = text.split(' ')
    const prefix = prefixWords(words)
    const a = words.join("").length * ratio
    const r = Math.sqrt(a / Math.PI)

    let index = 0
    let lines = []
    for (let i = 0.5; i <= 2 * r; i++) {
        const target = circleHeight(i, r * 2)
        const targetIndex = getClosestHeight(index, prefix, target)
        lines.push(words.slice(index, targetIndex).join(" "))
        index = targetIndex
    }
    return lines
}

export function getClosestHeight(left: number, prefix: number[], target: number) {
    let best = Number.MAX_SAFE_INTEGER
    let bestIndex = left
    let second = 0
    let secondIndex = 0
    for (let i = left; i < prefix.length; i++) {
        const size = prefix[i] - prefix[left]
        const difference = Math.abs(size - target)
        if (difference < best) {
            second = best
            secondIndex = bestIndex
            best = difference
            bestIndex = i
        }
    }
    return bestIndex + 1
}

export function circleHeight(x: number, r: number) {
    return 2 * Math.sqrt(r * x - x ** 2)
}

export function unitCircleHeight(x: number) {
    return Math.sqrt(2 * x - x ** 2)
}

export function numLinesForCircle(str: string) {
    return Math.floor(2 * Math.sqrt(str.length / Math.PI))
}

export function prefixWords(words: string[]) {
    let prefix = [words[0].length]
    for (let i = 1; i < words.length; i++) {
        prefix.push(words[i].length + prefix[prefix.length - 1])
    }
    return prefix
}