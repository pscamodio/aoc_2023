import { Challenge } from "./challenge.ts";
const DIGITS = "1234567890";
const DIGIMAP = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}

function checkTextNumber(s: string): string | undefined {
    for (const [text, value] of Object.entries(DIGIMAP)) {
        if (s.startsWith(text)) {
            return value;
        }
    }
}

function isDigit(s: string): boolean {
    return DIGITS.includes(s);
}

function toNumbers(s: string): string[] {
    const numbers : string[] = [];
    for (let i=0; i<s.length; ++i) {
        if (isDigit(s[i])) {
            numbers.push(s[i]);
            continue;
        }
        const num = checkTextNumber(s.substring(i));
        if (num) {
            numbers.push(num);
        }
    }

    return numbers;
}

function calNumber(s: string) : number {
    const digits = toNumbers(s);
    const first = digits[0];
    const last = digits[digits.length-1];
    return parseInt([first, last].join(""));
}

function phase1(input: string): string {
    const numbers = input.split("\n").map(calNumber);
    return numbers.reduce(function (prev, curr) { return prev + curr}, 0).toString();
}

function phase2(input: string): string {
    return phase1(input);
}

export const day1 : Challenge = {
    phase1, phase2
};