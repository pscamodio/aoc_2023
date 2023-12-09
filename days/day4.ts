import { createSolver } from "../utils/aoc.ts";
import { array_sum } from "../utils/array.ts";
import { isNonEmpty } from "../utils/string.ts";

const DEMO_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

type Card = {
    winners: number[];
    numbers: number[];
}

function parseCard(line: string): Card {
    const nums = line.split(":")[1];
    const [winners, numbers] = nums.split("|").map((a) => a.split(" ").filter(isNonEmpty).map(parseFloat));
    return {
        winners, numbers
    };
}

function computeScore(c: Card): number {
    let score = 0;
    for (const winner of c.winners) {
        if (c.numbers.includes(winner)) {
            if (score === 0) score = 1;
            else score *= 2;
        }
    }
    return score;
}

function solve1(input = DEMO_INPUT): string {
    const lines = input.split("\n").filter(isNonEmpty);
    const scores = lines.map(parseCard).map(computeScore);
    return array_sum(scores).toString();
}

function solve2(input = DEMO_INPUT): string {
    return input;
}

export const solve = createSolver(solve1, solve2);
