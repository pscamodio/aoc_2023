import { createSolver } from "../utils/aoc.ts";

const DEMO_INPUT = `..F7.
|FJ|.
SJ.L7
|F--J
LJ...
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
}


function solve1(input = DEMO_INPUT): string {
    const grid = new Grid(input);
    const loop = grid.findLoop();
    return Math.ceil(loop.length / 2).toString();
}

function solve2(input = DEMO_INPUT): string {
    return input;
}

export const solve = createSolver(solve1, solve2);
