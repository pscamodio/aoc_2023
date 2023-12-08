export function isNonEmpty(s: string): boolean {
    return !!s.length;
}

const DIGITS = "1234567890";

export function isDigit(s: string): boolean {
    return DIGITS.includes(s);
}