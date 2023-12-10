import { createSolver } from "../utils/aoc.ts";

const DEMO_INPUT = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

type Node = {
    left: string;
    right: string;
}

function parseNodes(lines: string[]): Map<string, Node> {
    const nodes = new Map<string, Node>();
    for (const line of lines) {
        const [key, tokens] = line.split(" = ");
        const [left, right] = tokens.substring(1, tokens.length-1).split(", ");
        nodes.set(key, {left, right});
    }
    return nodes;
}

function parseInput(input: string): [string, Map<string, Node>] {
    const [pattern, nodes] = input.trim().split("\n\n");
    console.log(nodes);
    return [pattern, parseNodes(nodes.split("\n"))];
}

function walkPath(pattern: string, nodes: Map<string, Node>) : numbers {
    let pos = "AAA";
    let steps = 0;
    while(true) {
        const nextStep = pattern[steps % pattern.length];
        steps++;
        const node = nodes.get(pos)!;
        pos = nextStep === "L" ? node.left : node.right;
        if (pos === "ZZZ") {
            return steps;
        }
    }
}

function solve1(input = DEMO_INPUT): string {
    const [pattern, nodes] = parseInput(input);
    const steps = walkPath(pattern, nodes);

    return steps.toString();
}

function solve2(input = DEMO_INPUT): string {
    return input;
}

export const solve = createSolver(solve1, solve2);
