import { createSolver } from "../utils/aoc.ts";
import { array_sum, combinations } from "../utils/array.ts";

const DEMO_INPUT = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

function transpose(grid: number[][]): number[][] {
    const transposed : number[][] = [];
    for (let col=0; col < grid[0].length; ++col) {
        const newRow : number[] =  [];

        for (let row=0; row < grid.length; ++row) {
            newRow.push(grid[row][col]);
        }
        transposed.push(newRow);
    }
    return transposed;
}

type Index = {
    row: number;
    col: number;
}

class Universe {
    grid: number[][];

    emptyRows: number[];
    emptyCols: number[];

    constructor(input: string) {
        const lines = input.trim().split("\n");
        this.grid = [];
        for (const line of lines) {
            const row = [];
            for (const char of line) {
                row.push(char === "#" ? 1 : 0);
            }
            this.grid.push(row);
        }
        this.emptyRows = this.grid.reduce((res, curr, currIndex) => {
            if (curr.every((val) => val === 0)) {
                return [...res, currIndex];
            }
            return res;
        }, []);
        const transposed = transpose(this.grid);
        this.emptyCols = transposed.reduce((res, curr, currIndex) => {
            if (curr.every((val) => val === 0)) {
                return [...res, currIndex];
            }
            return res;
        }, []);
    }

    galaxies(): Index[] {
        const galaxies : Index[] = [];
        for (const [row, line] of this.grid.entries()) {
            for (const [col, value] of line.entries()) {
                if (value === 1) {
                    galaxies.push({row, col});
                }
            }
        }
        return galaxies;
    }

    toString(): string {
        return this.grid.join("\n");
    }

    distance(from: Index, to: Index, expansion = 2) : number {
        const rowRange = [Math.min(from.row, to.row), Math.max(from.row, to.row)];
        const colRange = [Math.min(from.col, to.col), Math.max(from.col, to.col)];

        const expandingRows = this.emptyRows.filter((row) => rowRange[0] < row && row < rowRange[1]).length;
        const expandingCols = this.emptyCols.filter((col) => colRange[0] < col && col < colRange[1]).length;

        const rowDistance = rowRange[1] - rowRange[0] + expandingRows * (expansion - 1);
        const colDistance = colRange[1] - colRange[0] + expandingCols * (expansion - 1);

        return rowDistance + colDistance;
    }
}


function solve1(input = DEMO_INPUT): string {
    const universe = new Universe(input);
    const pairs = combinations(universe.galaxies());
    const distances = pairs.map(([from, to]) => universe.distance(from, to));
    return array_sum(distances).toString();
}

function solve2(input = DEMO_INPUT): string {
    const universe = new Universe(input);
    const pairs = combinations(universe.galaxies());
    const distances = pairs.map(([from, to]) => universe.distance(from, to, 1000000));
    return array_sum(distances).toString();
}

export const solve = createSolver(solve1, solve2);
