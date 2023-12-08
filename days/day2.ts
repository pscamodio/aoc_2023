import { createSolver } from "../utils/aoc.ts";
import { assert, isKeyOf } from "../utils/assert.ts";

const DEMO_INPUT = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`


type Cubes = {
    red: number;
    green: number;
    blue: number;
}

const LIMIT : Cubes = {
    red: 12,
    green: 13,
    blue: 14,
};

function playPossible(maxDraws: Cubes) : boolean {
    for (const key of ["red", "green", "blue"] as const) {
        if (maxDraws[key] > LIMIT[key]) return false;
    }
    return true;
}

function playMaxCubes(play: string): Cubes {
    const max : Cubes = {red:0, green:0, blue:0};
    const games = play.split(":")[1];
    const draws = games.split(/[,;]/);
    for (const draw of draws) {
        const [value, color] = draw.trim().split(" ");
        const num = parseInt(value);
        assert(isKeyOf(color, max), color);
        if (max[color] < num) {
            max[color] = num;
        }
    }
    return max;
}

function solve1(input: string = DEMO_INPUT): string {
    const lines = input.split("\n").filter((s) => s.length );
    let sum = 0;
    for (const [index, line] of lines.entries()) {
        const play = playMaxCubes(line);
        if (playPossible(play)) {
            sum += index + 1;
        }
    }
    return JSON.stringify(sum);
}

function solve2(input: string = DEMO_INPUT): string {
    const lines = input.split("\n").filter((s) => s.length );
    let sum = 0;
    for (const line of lines) {
        const play = playMaxCubes(line);
        sum += play.red * play.green * play.blue;
    }
    return JSON.stringify(sum);
}

export const solve = createSolver(solve1, solve2);