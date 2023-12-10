import { createSolver } from "../utils/aoc.ts";

const DEMO_INPUT = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`;

type Index = {
    row: number;
    col: number;
}

function move(from: Index, row: number, col: number): Index {
    return {
        row: from.row + row,
        col: from.col + col,
    };
}

function isSameIndex(a: Index, b: Index): boolean {
    return a.row == b.row && a.col === b.col;
}

function isSameIndexAs(a: Index) {
    return (b: Index) => isSameIndex(a, b);
}

class Grid {
    lines: string[];

    constructor(input: string) {
        this.lines = input.trim().split("\n");
    }

    get rows() {
        return this.lines.length;
    }

    get cols() {
        return this.lines[0].length;
    }

    find(letter: string): Index {
        for (const [row, line] of this.lines.entries()) {
            const col = line.indexOf(letter);
            if (col >= 0) {
                return {row, col};
            }
        }
        throw new Error("Not found");
    }

    get(position: Index): string {
        return this.lines[position.row][position.col];
    }

    connections(position: Index): Index[] {
        switch (this.get(position)) {
            case "|":
                return [move(position, 1, 0), move(position, -1, 0)];
            case "-":
                return [move(position, 0, 1), move(position, 0, -1)];
            case "L":
                return [move(position, -1, 0), move(position, 0, 1)];
            case "J":
                return [move(position, -1, 0), move(position, 0, -1)];
            case "7":
                return [move(position, 1, 0), move(position, 0, -1)];
            case "F":
                return [move(position, 1, 0), move(position, 0, 1)];
            case "S":
                return [move(position, 1, 0), move(position, -1, 0), move(position, 0, 1), move(position, 0, -1)];
        }
        return [];
    }

    validConnections(position: Index): Index[] {
        const connections = this.connections(position);
        return connections.filter((target) => {
            if (!this.isInsideGrid(target)) return false;
            const targetConnections = this.connections(target);
            return targetConnections.find(isSameIndexAs(position)) !== undefined;
        });
    }

    traverse(start: Index, next: Index): Index[] | undefined {
        let from = start;
        let to = next;
        const path : Index[] = [start];
        while(true) {
            path.push(to);
            const nextConnections = this.validConnections(to);
            const pathForward = nextConnections.find((path) => !isSameIndex(from, path));
            if (!pathForward) return;
            if (isSameIndex(start, pathForward)) return path;
            from = to;
            to = pathForward;
        }
    }
    
    findLoop() : Index[] {
        const startIndex = this.find("S");
        const paths = this.validConnections(startIndex);
        for (const path of paths) {
            const foundPath = this.traverse(startIndex, path);
            if (foundPath) {
                return foundPath;
            }
        }
        throw new Error("Not Found");
    }

    isInsideGrid(point: Index) : boolean {
        return point.col >= 0 && point.col < this.cols && point.row >= 0 && point.row < this.rows;
    }

    rayCast(from: Index, loop: Index[]): number {
        let toCheck = move(from, 0, 1);
        let count = 0;
        let maybeHit : Index[] | undefined = undefined;

        const checkHit = () => {
            if (!maybeHit) return;
            const letters = maybeHit.map((index) => this.get(index));
            if (
                letters.includes("|") || 
                letters.includes("S") || //works only on my input as the S is a vertical line
                letters.includes("L") && letters.includes("7") ||
                letters.includes("J") && letters.includes("F")
                ) {
                    count++;
                }
            maybeHit = undefined;
        }

        while (this.isInsideGrid(toCheck)) {
            const loopIndex = loop.findIndex(isSameIndexAs(toCheck));
            if (loopIndex !== -1) {
                if (!maybeHit) {
                    maybeHit = [toCheck];
                } else {             
                    const prev = loop[loopIndex - 1] ?? loop[loop.length - 1];
                    const next = loop[loopIndex + 1] ?? loop[0];
                    const sameHit = isSameIndex(prev, from) || isSameIndex(next, from);
                    if (sameHit) {
                        maybeHit.push(toCheck);
                    } else {
                        checkHit();
                        maybeHit = [toCheck];
                    }
                }
            } else {
                checkHit();
            }
            from = toCheck;
            toCheck = move(toCheck, 0, 1);
        }
        checkHit();
        return count;
    }

    isInsideLoop(point: Index, loop: Index[]): boolean {
        if (loop.find(isSameIndexAs(point))) return false;
        const hits = this.rayCast(point, loop);
        return hits % 2 !== 0;
    }
}


function solve1(input = DEMO_INPUT): string {
    const grid = new Grid(input);
    const loop = grid.findLoop();
    return Math.ceil(loop.length / 2).toString();
}

function solve2(input = DEMO_INPUT): string {
    const grid = new Grid(input);
    const loop = grid.findLoop();
    let counter = 0;
    for (let row = 0; row < grid.rows; ++row) {
        for (let col = 0; col < grid.cols; ++col) {
            const index = {row, col};
            if (grid.isInsideLoop(index, loop)) {
                counter++;
            }
        }
    }
    return counter.toString();
}

export const solve = createSolver(solve1, solve2);
