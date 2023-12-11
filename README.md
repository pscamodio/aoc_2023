Solutions for the 2023 Advent Of Code

# How to use
## Prerequisite
* Deno available in path
* Define AOC_SESSION env variable pointing to the user session cookie

## How to run a solution
`deno run -A main.ts [-d] {day} {part}`
* -d -> enable use of DEMO_INPUT instead of the real input
* {day} -> optional, day number, default to 1
* {part} -> optional, part number 1|2, default to 1

Eg:
* `deno run -A main.ts 1 2` -> solve day 1 part 2 with official input from the aoc website
* `deno run -A main.ts -d 12 1` -> solve day 12 part 1 using the DEMO_INPUT defined in the solution file

## How to write a solution
* Copy the `day_template.ts` file and rename it to `day{dayNumber}.ts`
* Implement the solve1 and solve2 functions for part1 and part2
* The main.ts file will load the proper file, and inject the day input if needed

## Input fetching
An utility function in utils/aoc.ts is implemented to fetch the day input from the aoc website using the AOC_SESSION cookie defined.
The first time an input is fetched is cached in the .aoc folder to not re-fetch it every time