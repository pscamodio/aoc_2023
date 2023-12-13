import { createSolver } from "../utils/aoc.ts";

const DEMO_INPUT = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

type Pattern = string[];

type Reflection = {
    index: number;

    orientation: "horizontal" | "vertical";
}

function parseInput(input: string): Pattern[] {
    return input.trim().split("\n\n").map((block) => block.split("\n"));
}

function reflectionDifferences(pattern: Pattern, rowIndex: number, colIndex: number): number {
    let distance = 1;
    let differences = 0;
    while (true) {
        const topRow = pattern[rowIndex - distance + 1];
        const bottomRow = pattern[rowIndex + distance];
        if (!topRow || !bottomRow) return differences;
        if (topRow[colIndex] !== bottomRow[colIndex]) {
            differences += 1;
        }
        distance += 1;
    }
}

function isReflectionRow(pattern: Pattern, rowIndex: number, diff: number): boolean {
    let count = 0;
    for (let colIndex = 0; colIndex !== pattern[0].length; ++colIndex) {
        count += reflectionDifferences(pattern, rowIndex, colIndex);
    }
    return count === diff;
}

function findReflection(pattern: Pattern, diff: number): Reflection[] {
    const scanRows = (pattern: Pattern, orientation: "horizontal" | "vertical") => {
        const reflections: Reflection[] = [];
        for (const rowIndex of pattern.keys()) {
            if (rowIndex === pattern.length - 1) continue;
            if (isReflectionRow(pattern, rowIndex, diff)) {
                reflections.push({
                    index: rowIndex + 1,
                    orientation,
                });
            }
        }
        return reflections;
    }
    return [...scanRows(pattern, "horizontal"), ...scanRows(transposed(pattern), "vertical")];
}

function summarize(reflections: Reflection[][]): number {
    return reflections.reduce((value, next) => {
        const columns = next.filter(({ orientation }) => orientation === "vertical").at(-1)?.index ?? 0;
        const rows = next.filter(({ orientation }) => orientation === "horizontal").at(-1)?.index ?? 0;
        return value + columns + rows * 100;
    }, 0);
}

function solve1(input = DEMO_INPUT): string {
    const patterns = parseInput(input);
    const reflections = patterns.map((p) => findReflection(p, 0));

    return summarize(reflections).toString();
}

function solve2(input = DEMO_INPUT): string {
    const patterns = parseInput(input);
    const reflections = patterns.map((p) => findReflection(p, 1));

    return summarize(reflections).toString();
}

export const solve = createSolver(solve1, solve2);

function transposed(grid: string[]): string[] {
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