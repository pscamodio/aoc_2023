import { assert, isKeyOf } from "../utils/assert.ts";

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

function solve1(input: string): string {
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

function solve2(input: string): string {
    const lines = input.split("\n").filter((s) => s.length );
    let sum = 0;
    for (const line of lines) {
        const play = playMaxCubes(line);
        sum += play.red * play.green * play.blue;
    }
    return JSON.stringify(sum);
}

export function solve(input: string, part: 1|2): string {
    switch(part) {
        case 1:
            return solve1(input);
        case 2:
            return solve2(input);
    }
}