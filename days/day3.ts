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
        for (let checkCol = col - 1; checkCol !== col + length + 1; checkCol ++) {
            if (parts.some(({row, col}) => row === checkRow && col === checkCol)) {
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

export function solve(input: string = DEMO_INPUT): string {
    const lines = input.split("\n").filter(isNonEmpty);
    const nums: number[] = [];
    const parts = computeSymbolIndexes(lines);
    
    for (const idx of lines.keys()) {
        addPartNumbers(lines, idx, nums, parts);
    }
    return array_sum(nums).toString();
}