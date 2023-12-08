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