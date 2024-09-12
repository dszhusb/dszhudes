export const format = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    let digit = ""
    if (seconds < 10) digit = '0';

    return `${minutes}:${digit + seconds}`;
};

