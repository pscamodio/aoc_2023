import { Challenge } from "./challenge.ts";
import {day1} from "./day1.ts";


function getDay(day: string) {
    switch(day){
        case "1": return day1;
    }
    return day1;
}

function getPhase(day: Challenge, phase: string) {
    if (phase === "1") return day.phase1;
    return day.phase2;
}

export function run(day: string, phase: string, input: string): string {
    return getPhase(getDay(day), phase)(input);
}