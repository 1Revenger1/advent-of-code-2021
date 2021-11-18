import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    console.log(input.split("\n")[0]);
}

function soln2(input: string) : void {
    console.log(input.split("\n")[1]);
}

export const soln : SolnExport = {
    desc: "Solution Template",
    part1: soln1,
    part2: soln2,
};