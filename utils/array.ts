export function array_sum(input: number[]): number {
    return input.reduce((prev, next) => prev + next, 0);
}

export function combinations<Value>(input: Value[]): [Value, Value][] {
    return input.flatMap((v, i) => input.slice(i+1).map((w) : [Value, Value] => [v, w]));
}