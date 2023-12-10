import { createSolver } from "../utils/aoc.ts";
import { array_sum } from "../utils/array.ts";

const DEMO_INPUT = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

function parseInput(input: string): number[][] {
    const lines = input.trim().split("\n");
    return lines.map((l) => l.split(" ").map(parseFloat));
}

function computeDifferences(input: number[]) : number[] {
    const res : number[] = [];
    for (let i=0; i<input.length-1; ++i) {
        res.push(input[i+1] - input[i]);
    }
    return res;
}

function computePyramid(input: number[]) : number[][] {
    let current = input;
    const pyramid = [input];
    while (!!current.length && !current.every((c) => c === 0)) {
        current = computeDifferences(current);
        pyramid.push(current);
    }
    return pyramid;
}

function extrapolateNextValue(pyramid: number[][]): number {
    let value = 0;
    for (let i=pyramid.length-1; i>=0; --i) {
        value += pyramid[i].at(-1) ?? 0;
    }
    return value;
}

function getNextValue(input: number[]): number {
    const pyramid = computePyramid(input);
    return extrapolateNextValue(pyramid);
}

function solve1(input = DEMO_INPUT): string {
    const sequences = parseInput(input);
    const values = sequences.map(getNextValue);
    
    return array_sum(values).toString();
}

function extrapolatePreviousValue(pyramid: number[][]): number {
    let value = 0;
    for (let i=pyramid.length-1; i>=0; --i) {
        value = pyramid[i][0] - value;
    }
    return value;
}

function getPreviousValue(input: number[]): number {
    const pyramid = computePyramid(input);
    const val = extrapolatePreviousValue(pyramid);
    return val;
}

function solve2(input = DEMO_INPUT): string {
    const sequences = parseInput(input);
    const values = sequences.map(getPreviousValue);
    
    return array_sum(values).toString();
}

export const solve = createSolver(solve1, solve2);
