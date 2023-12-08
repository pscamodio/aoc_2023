import { fetchAocInput } from "./utils/aoc-fetch.ts";
import { assert } from "./utils/assert.ts";

const day = parseInt(Deno.args[0]) ?? 1;
const part = parseInt(Deno.args[1]) ?? 1;
const demo = !!Deno.args[2];

const { solve } = await import(`./days/day${day}.ts`);

assert(solve, "Solve import missing from day");

const input = await fetchAocInput(day);

const start = performance.now();
const solution = solve(demo ? undefined : input, part);
const took = performance.now() - start;
console.log("Solved in", took.toFixed(3), "ms");
console.log(solution);