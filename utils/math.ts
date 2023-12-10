
export function gcd(...arr: number[]): number {
    const _gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};

export function lcm(...arr: number[]): number {
    const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};