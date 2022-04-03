/**
 * Generates a randpom full number between (and including) two numbers.
 * Defninitely not copied from https://www.w3schools.com/js/js_random.asp
 * @param min
 * @param max
 * @returns
 */
export const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
