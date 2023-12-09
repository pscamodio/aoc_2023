import { assert } from "./assert.ts";
import { exists } from "https://deno.land/std@0.208.0/fs/mod.ts";

export async function fetchAocInput(day: number) {
    const localCachePath = `.aoc/day${day}.txt`;
    if (await exists(localCachePath)) {
        return await Deno.readTextFile(localCachePath);
    }
    const session = Deno.env.get("AOC_SESSION");
    assert(session, "Define AOC_SESSION to point to the AOC session cookie");
    const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            cookie: `session=${session}`
        }
    })
    const text = await res.text();
    Deno.mkdir(".aoc", { recursive: true});
    await Deno.writeTextFile(localCachePath, text);
    return text;
}

type Solver = ((input?: string) => string) | ((input?: string) => Promise<string>);

export function createSolver(part1: Solver, part2: Solver) {
    return async (input: string, part: 1|2) => {
        switch(part){
            case 1:
                return await part1(input);
            case 2:
                return await part2(input);
        }
    }
}