import { fetchAocInput } from "./utils/aoc-fetch.ts";
import { assert } from "./utils/assert.ts";

const day = parseInt(Deno.args[0]) ?? 1;
const part = parseInt(Deno.args[1]) ?? 1;

const { solve } = await import(`./days/day${day}.ts`);

assert(solve, "Solve import missing from day");

const input = await fetchAocInput(day);

console.log(solve(input, part));