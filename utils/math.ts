
export function gcd(...arr: number[]): number {
    const _gcd = (x: number, y: number) => (!y ? x : gcd(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};

export function lcm(...arr: number[]): number {
    const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};

export function manhattanDistance(x: number, y:number, x2: number, y2: number) : number {
    return Math.abs(x2 - x) + Math.abs(y2 - y);
}