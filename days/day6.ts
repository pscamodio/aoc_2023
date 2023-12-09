import { createSolver } from "../utils/aoc.ts";
import { isNonEmpty } from "../utils/string.ts";

const DEMO_INPUT = `Time:      7  15   30
Distance:  9  40  200
`;

type Race = {
    duration: number;
    distance: number;
}

function parseInput(input: string): Race[] {
    const [time, distance] = input.split("\n").filter(isNonEmpty);
    const durations = time.split(":")[1].trim().split(" ").map((x) => parseFloat(x.trim())).filter((x) => !isNaN(x));
    const distances = distance.split(":")[1].trim().split(" ").map((x) => parseFloat(x.trim())).filter((x) => !isNaN(x));
    const races : Race[] = [];
    for (const [index, duration] of durations.entries()) {
        races.push({
            duration, distance: distances[index]
        })
    }
    return races;
}

function winningStrategies(race: Race): number {
    let strategies = 0;
    for (let speed=0; speed != race.duration; ++speed) {
        const distance = speed * (race.duration - speed);
        if (distance > race.distance) strategies++;
    }
    return strategies;
}

function solve1(input = DEMO_INPUT): string {
    const races = parseInput(input);
    const margins = races.map(winningStrategies);
    return margins.reduce((p,n) => p*n, 1).toString();
}

function parseInput2(input: string): Race {
    const [times, distances] = input.split("\n").filter(isNonEmpty);
    const duration = parseFloat(times.split(":")[1].trim().replaceAll(" ", ""));
    const distance = parseFloat(distances.split(":")[1].trim().replaceAll(" ", ""));
    return {duration, distance};
}

function solve2(input = DEMO_INPUT): string {
    const race = parseInput2(input);
    const strategies = winningStrategies(race);
    return strategies.toString();
}

export const solve = createSolver(solve1, solve2);
