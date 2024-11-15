export type Shell = {
    position: Vector;
    rotation: number;
    size: number;
}

export const getRandomShell = (ranges: range[], threshold: number, index: number): Shell => {
    const rangeValues = ranges[index];
    const range = rangeValues.high - rangeValues.low;
    return {
        position: getPosition(index < threshold),
        rotation: Math.floor(Math.random() * 360),
        size: Math.random() * range + rangeValues.low,
    };
};

const getPosition = (isUnder: boolean): Vector => {
    if (isUnder) {
        const xBase = Math.random() > 0.5 ? 66 : 0
        return { x: Math.random() * 33 + xBase, y: Math.random() * 60 }
    } else {
        const xBase = Math.random() > 0.5 ? 60 : 0
        return { x: Math.random() * 40 + xBase, y: Math.random() * 80 }
    }
}