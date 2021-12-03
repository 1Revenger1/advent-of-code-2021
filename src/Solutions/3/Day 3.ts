import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let nums = input.split("\n").map((value) => parseInt(value, 2));
    let width = input.indexOf("\n");
    let maxResult = 0;
    let minResult = 0;
    let total = nums.length;

    for (let i = 0; i < width; i++) {
        let ones = nums.filter(value => (value >> i) & 0x1).length;
        maxResult |= ((ones >= total - ones) ? 1 : 0) << i;
        minResult |= ((ones >= total - ones) ? 0 : 1) << i;
    }

    console.log (minResult * maxResult);
}

function soln2(input: string) : void {
    let oxy = input.split("\n").map((value) => parseInt(value, 2));
    let co2 = Object.assign([], oxy);
    let width = input.indexOf("\n");
    
    for (let i = width - 1; i >= 0; i--) {
        let count = oxy.filter(value => (value >> i) & 0x1).length;

        let val = count >= oxy.length - count ? 1 : 0;
        oxy = oxy.filter(value => ((value >> i) & 0x1) == val);
        if (oxy.length == 1) break;
    }

    for (let i = width - 1; i >= 0; i--) {
        let count = co2.filter(value => (value >> i) & 0x1).length;

        let val = count >= co2.length - count ? 0 : 1;
        co2 = co2.filter(value => ((value >> i) & 0x1) == val);
        if (co2.length == 1) break;
    }

    console.log(oxy[0] * co2[0]);
}

export const soln : SolnExport = {
    desc: "Binary Diagnostic",
    part1: soln1,
    part2: soln2,
};