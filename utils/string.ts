export function isNonEmpty(s: string): boolean {
    return !!s.length;
}

const DIGITS = "1234567890";

export function isDigit(s: string): boolean {
    return DIGITS.includes(s);
}

export function transposed(grid: string[]): string[] {
    const transposed: string[] = [];
    for (let col = 0; col < grid[0].length; ++col) {
        const newRow: string[] = [];

        for (let row = 0; row < grid.length; ++row) {
            newRow.push(grid[row][col]);
        }
        transposed.push(newRow.join(""));
    }
    return transposed;
}