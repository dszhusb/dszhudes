import type { PageData } from "./$types";

export function seekIndex(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] < target) {
            result = mid; // Update result because arr[mid] is less than the target
            left = mid + 1; // Search the right half
        } else {
            right = mid - 1; // Search the left half
        }
    }

    return result;
}

export function makeTimesList(data: PageData) {
    let times: number[] = []
    for (let d of Object.entries(data)) {
        times = times.concat(d[1].timestamps)
    }
    return times
}