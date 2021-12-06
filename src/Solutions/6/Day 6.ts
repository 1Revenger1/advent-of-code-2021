import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let fishes = input.split(",").map(val => parseInt(val));
    
    for (let i = 0; i < 80; i++) {
        let size = fishes.length;
        for (let j = 0; j < size; j++) {
            if (fishes[j] == 0) {
                fishes[j] = 6;
                fishes.push(8);
            } else {
                fishes[j]--;
            }
        }
    }

    console.log(fishes.length);
}

function soln2(input: string) : void {
    let fishes = input.split(",").map(val => parseInt(val));
    let days = new Array(9).fill(0);
    fishes.forEach(val => {
        days[val]++;
    });

    for (let i = 0; i < 256; i++) {
        let day0 = days.shift();
        days[6] += day0;
        days[8] = day0;
    }

    let total = 0;
    days.forEach(day => {
        total += day
    });
    console.log(total);
}

export const soln : SolnExport = {
    desc: "Lanternfish",
    part1: soln1,
    part2: soln2,
};