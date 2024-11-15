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