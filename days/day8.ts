import { createSolver } from "../utils/aoc.ts";
import { lcm } from "../utils/math.ts";

const DEMO_INPUT = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

type Node = {
    left: string;
    right: string;
}

function parseNodes(lines: string[]): Map<string, Node> {
    const nodes = new Map<string, Node>();
    for (const line of lines) {
        const [key, tokens] = line.split(" = ");
        const [left, right] = tokens.substring(1, tokens.length - 1).split(", ");
        nodes.set(key, { left, right });
    }
    return nodes;
}

function parseInput(input: string): [string, Map<string, Node>] {
    const [pattern, nodes] = input.trim().split("\n\n");
    return [pattern, parseNodes(nodes.split("\n"))];
}

function walkPath1(pattern: string, nodes: Map<string, Node>): number {
    let pos = "AAA";
    let steps = 0;
    while (true) {
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
    const steps = walkPath1(pattern, nodes);

    return steps.toString();
}

function findStartingPositions(nodes: string[]): string[] {
    return nodes.filter((n) => n.endsWith("A"));
}

function computeLoopLength(startPosition: string, pattern: string, nodes: Map<string, Node>): number {
    let pos = startPosition;
    let steps = 0;
    while (true) {
        const nextStep = pattern[steps % pattern.length];
        steps++;
        const node = nodes.get(pos)!;
        pos = nextStep === "L" ? node.left : node.right;
        if (pos.endsWith("Z")) {
            return steps;
        }
    }
}

function walkPath2(pattern: string, nodes: Map<string, Node>): number {
    const positions = findStartingPositions(Array.from(nodes.keys()));
    // Exploiting the fact that the paths loop with the same periodicity
    const loops = positions.map((pos) => computeLoopLength(pos, pattern, nodes));
    return lcm(...loops);
}

function solve2(input = DEMO_INPUT): string {
    const [pattern, nodes] = parseInput(input);
    const steps = walkPath2(pattern, nodes);

    return steps.toString();
}

export const solve = createSolver(solve1, solve2);
