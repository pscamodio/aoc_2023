import { createSolver } from "../utils/aoc.ts";
import { array_sum } from "../utils/array.ts";
import { isDigit, isNonEmpty } from "../utils/string.ts";

const DEMO_INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

type Index = {
    row: number;
    col: number;
}


function computeSymbolIndexes(lines: string[]): Index[] {
    const indices: Index[] = [];
    for (const [row, line] of lines.entries()) {
        for (let col = 0; col < line.length; ++col) {
            if (!isDigit(line[col]) && line[col] !== ".") {
                indices.push({ row, col });
            }
        }
    }
    return indices;
}


function isPartNumber(row: number, col: number, length: number, parts: Index[]): boolean {
    for (let checkRow = row - 1; checkRow !== row + 2; checkRow++) {
        for (let checkCol = col - 1; checkCol !== col + length + 1; checkCol++) {
            if (parts.some(({ row, col }) => row === checkRow && col === checkCol)) {
                return true;
            }
        }
    }
    return false;
}

function addPartNumbers(lines: string[], lineNum: number, nums: number[], parts: Index[]) {
    const line = lines[lineNum];
    const matches = line.matchAll(/(\d+)/g);
    for (const match of matches) {
        const { index, "0": value } = match;
        if (isPartNumber(lineNum, index ?? 0, value.length, parts)) {
            nums.push(parseInt(value));
        }
    }
}

export function solve1(input: string = DEMO_INPUT): string {
    const lines = input.split("\n").filter(isNonEmpty);
    const nums: number[] = [];
    const parts = computeSymbolIndexes(lines);

    for (const idx of lines.keys()) {
        addPartNumbers(lines, idx, nums, parts);
    }
    return array_sum(nums).toString();
}

type NumData = Index & {
    length: number;
    value: number;
}

function findNumbers(lines: string[]): NumData[] {
    const numbers: NumData[] = [];
    for (const [row, line] of lines.entries()) {
        const matches = line.matchAll(/(\d+)/g);
        for (const match of matches) {
            const { index: col = 0, "0": value } = match;
            numbers.push({
                row, col, length: value.length, value: parseInt(value)
            })
        }
    }
    return numbers;
}
// <>
function isAdjacent(num: NumData, row: number, col: number) {
    const adjacentRow = row >= num.row -1 && row <= num.row + 1;
    const adjecentCol = col >= num.col -1 && col <= num.col + num.length;
    return adjacentRow && adjecentCol;
}

function checkGear(row: number, col: number, numbers: NumData[]): number | undefined {
    const adjNumbers =  numbers.filter((n) => isAdjacent(n, row, col));
    console.log("Found", adjNumbers);
    if (adjNumbers.length !== 2) return;
    return adjNumbers[0].value * adjNumbers[1].value;
}

function findGearValues(lines: string[], numbers: NumData[]): number[] {
    const values : number[] = [];
    for (const [row, line] of lines.entries()) {
        const matches = line.matchAll(/(\*)/g);
        for (const match of matches) {
            console.log("Check gear", row, match.index);
            const gearValue = checkGear(row, match.index??0, numbers);
            if (gearValue) {
                console.log("Found gear", row, match.index, gearValue);
                values.push(gearValue);
            }
        }
    }
    return values;
}

export function solve2(input: string = DEMO_INPUT): string {
    const lines = input.split("\n").filter(isNonEmpty);
    const numbers = findNumbers(lines);
    const gears = findGearValues(lines, numbers);
    return array_sum(gears).toString();
}

export const solve = createSolver(solve1, solve2);