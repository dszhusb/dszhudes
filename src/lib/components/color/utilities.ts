/* GENERATE A COLOR */

export function randomColor(start: number, end: number) {
    return <RgbColor>{ r: randomColorDigit(start, end), g: randomColorDigit(start, end), b: randomColorDigit(start, end) }
}

function randomColorDigit(start: number, end: number): number {
    start = Math.max(0, start);
    end = Math.min(end, 255);
    return Math.floor((end - start) * Math.random()) + start;
}

/* RGB <-> HSL */

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

/* RGB <-> HEX */

export function rgbaToHex(c: RgbColor): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const rHex = toHex(c.r);
    const gHex = toHex(c.g);
    const bHex = toHex(c.b);
    if (c.a) {
        return `#${rHex}${gHex}${bHex}${toHex(c.a)}`;
    }
    return `#${rHex}${gHex}${bHex}`;
}

export function hexToRgba(hex: string): RgbColor | null {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (hex.length > 8) {
        return { r: r, g: g, b: b, a: parseInt(hex.slice(8, 10), 16) }
    } else {
        return { r: r, g: g, b: b }
    }
}

/* RGB <-> CMYK*/

export const rgbaToCmyk = (c: RgbColor): CmykColor => {
    const r = c.r / 255
    const g = c.g / 255
    const b = c.b / 255
    const k = 1 - Math.max(r, g, b)
    const divisor = 1 - k
    return { c: (1 - r - k) / divisor, m: (1 - g - k) / divisor, y: (1 - r - b) / divisor, k }
}

export const cmykToRgba = (c: CmykColor): RgbColor => {
    const factor = (1 - c.k) * 255
    return { r: (1 - c.c) * factor, g: (1 - c.m) * factor, b: (1 - c.y) * factor }
}

/* BLENDING */

function blendColor(c1: RgbColor, c2: RgbColor, alpha: number) {
    return <RgbColor>{ r: lerp(c1.r, c2.r, alpha), g: lerp(c1.g, c2.g, alpha), b: lerp(c1.b, c2.b, alpha) }
}

function lerp(a: number, b: number, alpha: number) {
    return Math.floor(a + alpha * (b - a))
}

export function blendColorToHex(c1: RgbColor, c2: RgbColor, alpha: number) {
    const c = blendColor(c1, c2, alpha);
    return Object.values(c).join(",")
}

export function joinColor(c: RgbColor) {
    return Object.values(c).join(",")
}

export function interpolateColorPalette(in1: RgbColor, in2: RgbColor): Palette {
    const cText = rgbaToHex(darkenColor(in1))
    const c1 = rgbaToHex(in1)
    const c2 = rgbaToHex(blendColor(in1, in2, 0.5))
    const c3 = rgbaToHex(in2)
    return <Palette>{ text: cText, f1: c1, f2: c2, f3: c3 }
}

/* Offshoot Colors */

const darkenColor = (c: RgbColor): RgbColor => {
    return <RgbColor>{ r: Math.max(c.r - 80, 0), g: Math.max(c.g - 80, 0), b: Math.max(c.b - 80, 0) }
}

export const createHexTransparency = (hex: string, alpha: number): string | null => {
    const rgba = hexToRgba(hex)
    if (rgba) {
        rgba.a = Math.floor(alpha * 255)
        return rgbaToHex(rgba)
    }
    return null
}

export const invertRgbColor = (rgb: RgbColor): RgbColor => {
    return { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b }
}

/* Other */

export const calculateError = (answer: GenericColor, guess: GenericColor): number => {
    let error = 0
    for (let key of Object.keys(answer)) {
        error += Math.abs(answer[key] - guess[key])
    }
    return error
}

export const calculateMatch = (answer: number, guess: number): number => {
    return Math.floor(Math.abs(answer - guess) / answer * 100)
}

export const sumMatches = (pairs: { guess: number, percent: number }[]) => {
    let divisor = 0
    let sum = 0

    for (let pair of pairs) {
        if (!isDisabled(pair.guess)) {
            sum += pair.percent
            divisor++
        }
    }

    return divisor === 0 ? "???" : `${Math.floor(sum / divisor)}%`;
}

export const isDisabled = (guess: number): boolean => {
    return guess >= 1 && guess === Math.floor(guess)
}

export const hasGuess = (guess: number): boolean => {
    return guess > 1
}

/* Date Generator */

export const isDaily = (c1: RgbColor, c2: RgbColor) => {
    return JSON.stringify(c1) === JSON.stringify(c2)
}

export const getColorFromDate = (date: Date): RgbColor => {
    // Format date as consistent string (YYYY-MM-DD)
    const dateString = date.toISOString().split('T')[0];

    // Generate hash from date string
    const hash = hashString(dateString);

    // Convert hash to RGB
    const rgb = hashToRGB(hash);

    // Convert to hex
    return rgb;
};

const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
};

/**
 * Converts a hash number to RGB values
 */
const hashToRGB = (hash: number): RgbColor => {
    // Use modulo to ensure values are between 0-255
    const r = (hash % 255);
    const g = ((hash * 7) % 255);
    const b = ((hash * 13) % 255);

    return { r, g, b };
};

/**
 * Converts RGB values to hex string
 */
const rgbToHex = ({ r, g, b }: RgbColor): string => {
    const toHex = (n: number): string => {
        const hex = n.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};