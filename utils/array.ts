export function array_sum(input: number[]): number {
    return input.reduce((prev, next) => prev + next, 0);
}