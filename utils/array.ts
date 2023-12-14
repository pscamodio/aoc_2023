export function array_sum(input: number[]): number {
    return input.reduce((prev, next) => prev + next, 0);
}

export function combinations<Value>(input: Value[]): [Value, Value][] {
    return input.flatMap((v, i) => input.slice(i+1).map((w) : [Value, Value] => [v, w]));
}

export function transposed<Value>(input: Value[][]): Value[][] {
    const t : Value[][] = [];
    for (const colId of input[0].keys()) {
        const newRow : Value[] = [];
        for (const rowId of input.keys()) {
            newRow.push(input[rowId][colId]);
        }
        t.push(newRow);
    }
    return t;
}

export function ccw<Value>(input: Value[][]): Value[][] {
    const t : Value[][] = input.map(({length}) => Array(length).fill("."));
    for (const rowId of input.keys()) {
        for (const colId of input[0].keys()) {
            t[input.length - colId - 1][rowId] = input[rowId][colId];
        }
    }
    return t;
}

export function swap<Value>(input: Value[], from: number, to: number): void {
    const tmp = input[from];
    input[from] = input[to];
    input[to] = tmp;
}