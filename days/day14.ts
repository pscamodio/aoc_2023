import { createSolver } from "../utils/aoc.ts";
import { array_sum, ccw, swap, transposed } from "../utils/array.ts";

const DEMO_INPUT = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

enum Cell {
    Empty = ".",
    Rolling = "O",
    Stuck = "#"
}

type Grid = Cell[][];

function parseInput(input: string): Grid {
    return input.trim().split("\n").map((line) => line.split("").map((c) => {
        switch(c) {
            case ".": return Cell.Empty;
            case "#": return Cell.Stuck;
        }
        return Cell.Rolling;
    }));
}

function gridToString(grid: Grid): string {
    return grid.map((g) => g.join("")).join("\n");
}

function tiltNorth(grid: Grid): Grid {
    grid = transposed(grid);
    for (const row of grid) {
        let emptyId : number | undefined = undefined;
        for (const colId of row.keys()) {
            switch(row[colId]) {
                case Cell.Empty: {
                    emptyId ??= colId; 
                    break;
                }
                case Cell.Stuck: {
                    emptyId = undefined; 
                    break;
                }
                case Cell.Rolling: {
                    if (emptyId === undefined) break;
                    swap(row, colId, emptyId);
                    emptyId++;
                }
            }
        }
    }
    return transposed(grid);
}

function solve1(input = DEMO_INPUT): string {
    let grid = parseInput(input);
    grid = tiltNorth(grid);
    const load = grid.map((row, index) => {
        return row.filter((cell) => cell === Cell.Rolling).length * (grid.length - index);
    })
    return array_sum(load).toString();
}

function cycle(grid: Grid): Grid {
    for (const _ in [0, 1, 2, 3]) {
        grid = tiltNorth(grid);
        grid = ccw(grid);
    }
    return grid;
}

function solve2(input = DEMO_INPUT): string {
    let grid = parseInput(input);
    console.log(gridToString(grid));
    console.log("----");
    grid = cycle(grid);
    console.log(gridToString(grid));
    return input;
}

export const solve = createSolver(solve1, solve2);
