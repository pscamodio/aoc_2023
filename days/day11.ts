import { createSolver } from "../utils/aoc.ts";
import { array_sum, combinations } from "../utils/array.ts";
import { manhattanDistance } from "../utils/math.ts";

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
        this.grow();
    }

    grow(): void {
        const growRows = () => {
            const newRows : number[][] = [];
            for (const row of this.grid) {
                newRows.push(row);
                if (row.every((value) => value === 0)) {
                    newRows.push(row);
                }
            }
            this.grid = newRows;
        }
        growRows();
        this.grid = transpose(this.grid);
        growRows();
        this.grid = transpose(this.grid);
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
}


function solve1(input = DEMO_INPUT): string {
    const universe = new Universe(input);
    const pairs = combinations(universe.galaxies());
    const distances = pairs.map(([from, to]) => manhattanDistance(from.row, from.col, to.row, to.col));
    return array_sum(distances).toString();
}

function solve2(input = DEMO_INPUT): string {
    return input;
}

export const solve = createSolver(solve1, solve2);
