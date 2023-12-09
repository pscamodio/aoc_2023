import { createSolver } from "../utils/aoc.ts";
import { isNonEmpty } from "../utils/string.ts";

const DEMO_INPUT = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

type Mapping = {
    sourceStart: number;
    targetStart: number;
    range: number;
}[];

function praseMapping(lines: string): Mapping {
    const [_header, ...maps] = lines.split("\n").filter(isNonEmpty);
    console.log("Parsing", _header);

    return maps.map((line) => {
        const [targetStart, sourceStart, range] = line.split(" ").map(parseFloat);
        return {sourceStart, targetStart, range};
    })
}

function parseAlmanac(input: string): [number[], Mapping[]] {
    const [seedLine, ...maps] = input.split("\n\n");
    const seeds = seedLine.split(":")[1].trim().split(" ").map(parseFloat);
    const mappings = maps.map(praseMapping);

    return [seeds, mappings];
}

function applyMapping(value: number, mapping: Mapping): number {
    for (const {sourceStart, targetStart, range} of mapping) {
        const normalizedValue = value - sourceStart;
        if (normalizedValue >= 0 && normalizedValue < range) {
            return targetStart + normalizedValue;
        }
    }
    return value;
}

function applyMappings(value: number, mappings: Mapping[]): number {
    for (const mapping of mappings) {
        value = applyMapping(value, mapping);
    }
    return value;
}

function solve1(input = DEMO_INPUT): string {
    const [seeds, mappings] = parseAlmanac(input);
    const locations = seeds.map((s) => applyMappings(s, mappings));
    return locations.reduce((prev, next) => Math.min(prev, next), Number.MAX_SAFE_INTEGER).toString();
}


function applyMappingReverse(value: number, mapping: Mapping): number {
    for (const {sourceStart, targetStart, range} of mapping) {
        const normalizedValue = value - targetStart;
        if (normalizedValue >= 0 && normalizedValue < range) {
            return sourceStart + normalizedValue;
        }
    }
    return value;
}

function applyMappingsReverse(value: number, mappings: Mapping[]): number {
    for (const mapping of mappings) {
        value = applyMappingReverse(value, mapping);
    }
    return value;
}

function isValidSeed(value: number, seedRanges: number[]) : boolean {
    for (let i=0; i < seedRanges.length; i += 2) {
        const start = seedRanges[i];
        const end = start + seedRanges[i+1];
        if (start <= value && value <= end) {
            return true;
        }
    }
    return false;
}

function solve2(input = DEMO_INPUT): string {
    const [seedRanges, mappings] = parseAlmanac(input);
    mappings.reverse();
    for (let loc = 0; loc != Number.MAX_SAFE_INTEGER; ++loc) {
        const seed = applyMappingsReverse(loc, mappings);
        if (isValidSeed(seed, seedRanges)) {
            return loc.toString();
        }
    }
    return "Boh!";
}

export const solve = createSolver(solve1, solve2);
