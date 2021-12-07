import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let pos = input.split(",").map(val => parseInt(val)).sort((a, b) => a - b);
    let mean = pos[Math.floor(pos.length / 2)];

    let total = pos.reduce((t, n) => t += Math.abs(n - mean), 0);
    console.log(total);
}

function sum(x: number) {
    return (x * (x + 1)) / 2;
}

function soln2(input: string) : void {
    let pos = input.split(",").map(val => parseInt(val));
    let avg = pos.reduce((prev, next) => prev += next);
    avg = Math.floor(avg / pos.length);

    let total = pos.reduce((t, n) => t += sum(Math.abs(n - avg)), 0);
    console.log(total);
}

export const soln : SolnExport = {
    desc: "Solution Template",
    part1: soln1,
    part2: soln2,
};