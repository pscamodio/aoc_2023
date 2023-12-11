import { fetchAocInput } from "./utils/aoc.ts";
import { assert } from "./utils/assert.ts";
import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";

const args = parseArgs(Deno.args, {
    boolean: ["d"],
});

function parseDayPart(x?: string|number): number | undefined {
    if (!x) return;
    return typeof x === "number" ? x : parseInt(x);
}

const day = parseDayPart(args._[0]) ??  1;
const part = parseDayPart(args._[1]) ?? 1;
const demo = args.d;

console.log(`Solving day ${day} part ${part} using the ${demo ? "demo" : "real"} input`);

const { solve } = await import(`./days/day${day}.ts`);
assert(solve, "Solve import missing from day");

const input = demo ? undefined : await fetchAocInput(day);

const start = performance.now();
const solution = await solve(input, part);
const took = performance.now() - start;
console.log("Solved in", took.toFixed(3), "ms");
console.log(solution);