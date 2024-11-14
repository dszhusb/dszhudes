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