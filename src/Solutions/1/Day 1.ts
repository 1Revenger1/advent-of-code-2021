import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let depths = input.split ("\n").map ((value) => parseInt (value));
    
    let increasing = 0;
    
    for (let i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i - 1]) {
            increasing++;
        }
    }

    console.log(increasing);
}

function soln2(input: string) : void {
    let depths = input.split ("\n").map ((value) => parseInt (value));
    
    let slidingDepth = depths[2] + depths[1] + depths[0];
    let lastSlidingDepth = slidingDepth;
    let increasing = 0;

    for (let i = 3; i < depths.length; i++) {
        slidingDepth += depths[i];
        slidingDepth -= depths[i - 3];

        if (slidingDepth > lastSlidingDepth) {
            increasing++;
        }

        lastSlidingDepth = slidingDepth;
    }

    console.log(increasing);
}

export const soln : SolnExport = {
    desc: "Sonar Sweep",
    part1: soln1,
    part2: soln2,
};