type Point = {
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    mc: number,
    theta: number
}

export type range = {
    high: number,
    low: number
}

export const ranges = {
    a: <range>{ low: 1, high: 5 },
    b: <range>{ low: 0.25, high: 0.4 },
    d: <range>{ low: 0.25, high: 1.25 },
    fc: <range>{ low: 75, high: 160 },
    bc: <range>{ low: 160, high: 255 }
}

export type RgbColor = {
    r: number,
    g: number,
    b: number
}

export type HslColor = {
    h: number,
    s: number,
    l: number
}

export const rgbToHsl = (color: RgbColor): HslColor => { // https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    let c: RgbColor = { r: color.r / 255, g: color.g / 255, b: color.b / 255 }
    const vmax = Math.max(c.r, c.g, c.b), vmin = Math.min(c.r, c.g, c.b);
    const average = (vmax + vmin) / 2;
    let hsl = <HslColor>{ h: average, s: average, l: average }

    if (vmax === vmin) {
        hsl.h = 0
        hsl.s = 0
        return hsl; // achromatic
    }

    const d = vmax - vmin;
    hsl.s = hsl.l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === c.r) hsl.h = (c.g - c.b) / d + (c.g < c.b ? 6 : 0);
    if (vmax === c.g) hsl.h = (c.b - c.r) / d + 2;
    if (vmax === c.b) hsl.h = (c.r - c.g) / d + 4;
    hsl.h /= 6;

    return hsl;
}

export const hslToRgb = (c: HslColor) => {
    let rgb = <RgbColor>{ r: 0, g: 0, b: 0 }
    if (c.s === 0) {
        rgb.r = rgb.g = rgb.b = c.l; // achromatic
    } else {
        const q = c.l < 0.5 ? c.l * (1 + c.s) : c.l + c.s - c.l * c.s;
        const p = 2 * c.l - q;
        rgb.r = hueToRgb(p, q, c.h + 1 / 3);
        rgb.g = hueToRgb(p, q, c.h);
        rgb.b = hueToRgb(p, q, c.h - 1 / 3);
    }

    rgb.r *= 255; rgb.g *= 255; rgb.b *= 255
    rgb.r = Math.round(rgb.r); rgb.g = Math.round(rgb.g); rgb.b = Math.round(rgb.b)
    return rgb;
}

const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

export type Parameters = {
    a: number,
    b: number,
    c?: number,
    d: number,
    l: number
}

export const valueInRange = (low: number, high: number, weight: number = 1) => {
    return (high - low) * weight * Math.random() + low
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
    return <RgbColor>{ r: Math.max(c.r - 80, 0), g: Math.max(c.g - 80, 0), b: Math.max(c.b - 80, 0) }
}

function randomColorDigit(start: number, end: number): number {
    start = Math.max(0, start);
    end = Math.min(end, 255);
    return Math.floor((end - start) * Math.random()) + start;
}

export function randomColor(start: number, end: number) {
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

    constructor(p: Parameters, f: RgbColor, b: RgbColor) {
        this.a = p.a;
        this.b = p.b;
        this.c = (p.c || 0);
        this.d = p.d;
        this.l = p.l;
        this.name = "";
        this.growth = this.genShell()
        this.bc = b;
        this.fc = f;
    }

    getCoords(theta: number) {
        const mult = Math.pow(Math.E, this.b * theta)
        let x = this.a * Math.cos(theta) * mult;
        let y = this.a * Math.sin(theta) * mult;
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

    updateBc(c: RgbColor) {
        this.bc = c;
        return this
    }

    updateFc(c: RgbColor) {
        this.fc = c;
        return this
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