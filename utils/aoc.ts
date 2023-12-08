import { assert } from "./assert.ts";

export async function fetchAocInput(day: number) {
    const session = Deno.env.get("AOC_SESSION");
    assert(session, "Define AOC_SESSION to point to the AOC session cookie");
    const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            cookie: `session=${session}`
        }
    })
    return res.text();
}

type Solver = (input?: string) => string;

export function createSolver(part1: Solver, part2: Solver) {
    return (input: string, part: 1|2) => {
        switch(part){
            case 1:
                return part1(input);
            case 2:
                return part2(input);
        }
    }
}