import { createSolver } from "../utils/aoc.ts";
import { array_sum } from "../utils/array.ts";
import { memo } from "../utils/memo.ts";

const DEMO_INPUT = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

type SpringLine = {
    line: string;

    runs: number[];
}

function parseLine(input: string): SpringLine {
    const [line, runs] = input.split(" ");
    return {
        line, 
        runs: runs.split(",").map(parseFloat),
    }
}

const validCombinations = memo((line: string, runs: number[]) : number => {
    // Termination case, the line is finished, the combination is valid if we've completed all the required runs
    if (line.length === 0) {
        return runs.length === 0 ? 1 : 0;
    }

    // Optimization, if no runs are left, check we don't have any invalid springs left
    if (runs.length === 0) {
        return line.includes("#") ? 0 : 1;
    }

    // Optimization, check if the residual length is enough for the remaining runs
    if (line.length < array_sum(runs) + runs.length - 1) {
        return 0;
    }

    // Start recursions
    // If first spring is good, check rest of the string
    if (line[0] === ".") {
        return validCombinations(line.slice(1), runs);
    }
    // If first spring is broken, check if we have enough possible broken spring for the run, if not bail out
    if (line[0] === "#") {
        const [run, ...otherRuns] = runs;
        // If we have a good spring in the run of broken spring this combination is not valid
        if (line.substring(0, run).includes(".")) {
            return 0;
        }
        // If the spring after the run is broken this combination is not valid
        if (line[run] === "#") {
            return 0;
        }
        // Check rest of the string, runs
        return validCombinations(line.slice(run + 1), otherRuns);
    }
    // Here we're at a decision point, the current spring is a ? need to check both branches
    return validCombinations("#" + line.slice(1), runs) + validCombinations("." + line.slice(1), runs);
});

function parseInput(input: string): SpringLine[] {
    return input.trim().split("\n").map(parseLine);
}

function solve1(input = DEMO_INPUT): string {
    const combinations = parseInput(input).map(({line, runs}) => validCombinations(line, runs));
    return array_sum(combinations).toString();
}

function solve2(input = DEMO_INPUT): string {
    const combinations = parseInput(input).map(({line, runs}, index, {length}) => {
        console.log("checking", index, length, line, runs);
        const expandedLine = [line, line, line, line, line].join("?");
        const expandedRuns = [...runs, ...runs, ...runs, ...runs, ...runs];
        console.log("expanded", expandedLine, expandedRuns);
        return validCombinations(expandedLine, expandedRuns);
    })
    return array_sum(combinations).toString();
}

export const solve = createSolver(solve1, solve2);
