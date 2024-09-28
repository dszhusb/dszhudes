type Point = {
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    mc: number,
    theta: number
}

type RgbColor = {
    r: number,
    g: number,
    b: number
}

export function interpolateColorPalette(in1: RgbColor, in2: RgbColor): Palette {
    const cText = rgbToHex(darkenColor(in1))
    const c1 = rgbToHex(in1)
    const c2 = rgbToHex(blendColor(in1, in2, 0.5))
    const c3 = rgbToHex(in2)
    return <Palette>{ text: cText, f1: c1, f2: c2, f3: c3 }
}

export function rgbToHex(c: RgbColor): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const rHex = toHex(c.r);
    const gHex = toHex(c.g);
    const bHex = toHex(c.b);
    return `#${rHex}${gHex}${bHex}`;
}

function darkenColor(c: RgbColor) {
    return <RgbColor>{ r: Math.max(c.r - 80, 0), g: Math.max(c.g - 80, 0), b: Math.max(c.b - 80, 0)}
}

function randomColorDigit(start: number, end: number): number {
    start = Math.max(0, start);
    end = Math.min(end, 255);
    return Math.floor((end - start) * Math.random()) + start;
}

function randomColor(start: number, end: number) {
    return <RgbColor>{ r: randomColorDigit(start, end), g: randomColorDigit(start, end), b: randomColorDigit(start, end) }
}

function lerp(a: number, b: number, alpha: number) {
    return Math.floor(a + alpha * (b - a))
}

function blendColor(c1: RgbColor, c2: RgbColor, alpha: number) {
    return <RgbColor>{ r: lerp(c1.r, c2.r, alpha), g: lerp(c1.g, c2.g, alpha), b: lerp(c1.b, c2.b, alpha) }
}

export function joinColor(c: RgbColor) {
    return Object.values(c).join(",")
}

export function blendColorToHex(c1: RgbColor, c2: RgbColor, alpha: number) {
    const c = blendColor(c1, c2, alpha);
    return Object.values(c).join(",")
}

export class Shell {
    a: number;
    b: number;
    c: number;
    d: number;
    l: number;
    name: string;
    growth: Point[];
    bc: RgbColor;
    fc: RgbColor;

    constructor(ia: number, ib: number, ic: number, id: number, mt: number) {
        this.a = ia;
        this.b = ib;
        this.c = ic;
        this.d = id;
        this.l = mt;
        this.name = "";
        this.growth = this.genShell()
        this.bc = randomColor(160, 255);
        this.fc = randomColor(75, 160);
    }

    getCoords(theta: number) {
        let x = this.a * Math.cos(theta) * Math.pow(Math.E, this.b * theta);
        let y = this.a * Math.sin(theta) * Math.pow(Math.E, this.b * theta);
        let disp = Math.sqrt(x * x + y * y)
        let rx = 1.5 * disp;
        let ry = this.d * disp;
        let mc = Math.random();
        let result = <Point>{ cx: x, cy: y, rx: rx, ry: ry, theta: theta, mc: mc };
        return result;
    }

    modifyCoords(theta: number, c: number) {
        let x = this.a * Math.cos(theta) * Math.pow(Math.E, this.b * theta);
        let y = this.a * Math.sin(theta) * Math.pow(Math.E, this.b * theta);
        let disp = Math.sqrt(x * x + y * y)
        let rx = 1.5 * disp;
        let ry = this.d * disp;
        let result = <Point>{ cx: x, cy: y, rx: rx, ry: ry, theta: theta, mc: c };
        return result;
    }

    updateA(ua: number) {
        this.a = ua;
        let newGrowth = []
        for (let p of this.growth) {
            newGrowth.push(this.modifyCoords(p.theta, p.mc));
        }
        this.growth = newGrowth;
        return this;
    }

    updateB(ub: number) {
        this.b = ub;
        let newGrowth = []
        for (let p of this.growth) {
            newGrowth.push(this.modifyCoords(p.theta, p.mc));
        }
        this.growth = newGrowth;
        return this;
    }

    updateC(uc: number) {
        this.c = uc;
        let newGrowth = []
        for (let p of this.growth) {
            newGrowth.push(this.modifyCoords(p.theta, p.mc));
        }
        this.growth = newGrowth;
        return this;
    }

    updateD(ud: number) {
        this.d = ud;
        let newGrowth = []
        for (let p of this.growth) {
            newGrowth.push(this.modifyCoords(p.theta, p.mc));
        }
        this.growth = newGrowth;
        return this;
    }

    genShell() {
        let counter = 0;
        let cTheta = 0;
        let pList = [];
        for (let i = this.l; i >= 0; i--) {
            let pt = this.getCoords(cTheta);
            pList[i] = pt;
            let tMod = counter / (this.l - 1) * 0.8
            cTheta += tMod * (Math.PI / 12 + Math.random() * 0.01);
            counter++;
        }
        return pList;
    }
}