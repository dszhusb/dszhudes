
interface Point {
    disp: number;
    mc: number;
    theta: number;
}

function randomBC() {
    return 200 + Math.random() * 55
}

function randomFC() {
    return 40 + Math.random() * 160
}

export class Shell {
    a: number;
    b: number;
    c: number;
    d: number;
    l: number;
    name: string;
    growth: Point[];
    bc: any;
    fc: any;

    //Constructor
    constructor(
        ia: number,
        ib: number,
        ic: number,
        id: number,
        mt: number,
    ) {
        //Generating Colors
        this.bc = [ randomBC(), randomBC(), randomBC()]
        this.fc = [ randomFC(), randomFC(), randomFC()]

        //Modifying Variables
        this.a = ia; //
        this.b = ib; //
        this.c = ic; //
        this.d = id; //
        this.l = mt; //Length
        this.name = "";

        this.growth = new Array(this.l);
        for (let i = 0; i < this.l; i++) {
            this.growth[i] = {} as Point;
        }

        this.initPoints();
    }

    getCoords(theta: number) {
        let x = this.a * Math.cos(theta) * Math.pow(Math.E, this.b * theta);
        let y = this.a * Math.sin(theta) * Math.pow(Math.E, this.b * theta);
        let disp = Math.sqrt(x * x + y * y)
        let mc = Math.random();
        let result = { theta, disp, mc };
        return result;
    }

    retPoints() {
        return this.growth;
    }
    initPoints() {
        this.growth = this.genShell();
    }
    retL() {
        return this.l;
    }
    getShell() {
        return this;
    }

    genShell() {
        let counter = 0;
        let cTheta = 0;
        let pList = [];
        for (let i = 0; i < 150; i++) {
            let pt = this.getCoords(cTheta);
            pList[i] = pt;
            let tMod = counter / (this.l - 1) * 0.8
            cTheta += tMod * (Math.PI / 12 + Math.random() * 0.01);
            counter++;
        }
        return pList;
    }

    updateGen() {
        for (let i = 0; i < this.growth.length; i++) {
            let t = this.growth[i].theta;
            let x = this.a * Math.cos(t) * Math.pow(Math.E, this.b * t);
            let y = this.a * Math.sin(t) * Math.pow(Math.E, this.b * t);
            let disp = Math.sqrt(x * x + y * y)
            this.growth[i].disp = disp;
        }
    }
}