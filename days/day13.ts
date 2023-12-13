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

function checkRowReflectionColumn(pattern: Pattern, rowIndex: number, colIndex: number) : boolean {
    let distance = 1;
    while(true) {
        const topRow = pattern[rowIndex - distance + 1];
        const bottomRow = pattern[rowIndex + distance];
        if (!topRow || !bottomRow) return true;
        if (topRow[colIndex] !== bottomRow[colIndex]) {
            return false;
        }
        distance += 1;
    }
}

function isReflectionRow(pattern: Pattern, rowIndex: number): boolean {
    for (let colIndex = 0; colIndex !== pattern[0].length; ++colIndex) {
        if (!checkRowReflectionColumn(pattern, rowIndex, colIndex)) {
            return false;
        }
    }
    return true;
}

function findReflection(pattern: Pattern): Reflection[] {
    const reflections : Reflection[] = [];
    for (const rowIndex of pattern.keys()) {
        if (rowIndex === pattern.length - 1) continue;
        if (isReflectionRow(pattern, rowIndex)) {
            reflections.push({
                index: rowIndex + 1,
                orientation: "horizontal",
            });
        }
    }
    const flipped = transposed(pattern);
    for (const rowIndex of flipped.keys()) {
        if (rowIndex === flipped.length - 1) continue;
        if (isReflectionRow(flipped, rowIndex)) {
            reflections.push({
                index: rowIndex + 1,
                orientation: "vertical",
            });
        }
    }
    return reflections;
}

function solve1(input = DEMO_INPUT): string {
    const patterns = parseInput(input);

    const reflections = patterns.map((p) => {
        const r = findReflection(p);
        return r;
    });

    return reflections.reduce((value, next) => {
        const columns = next.filter(({orientation}) => orientation === "vertical").at(-1)?.index ?? 0;
        const rows = next.filter(({orientation}) => orientation === "horizontal").at(-1)?.index ?? 0;
        return value + columns + rows * 100;
    }, 0).toString();
}

function solve2(input = DEMO_INPUT): string {
    return input;
}

export const solve = createSolver(solve1, solve2);

function transposed(grid: string[]): string[] {
    const transposed : string[] = [];
    for (let col=0; col < grid[0].length; ++col) {
        const newRow  : string [] = [];

        for (let row=0; row < grid.length; ++row) {
            newRow.push(grid[row][col]);
        }
        transposed.push(newRow.join(""));
    }
    return transposed;
}