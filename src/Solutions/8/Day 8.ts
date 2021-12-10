import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let total = 0;
    input.split("\n").forEach(line => {
        let output = line.split("|");
        let words = output[1].split(" ");
        words.forEach(val => {
            switch(val.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    total++;
            }
        });
    });
    console.log(total);
}

function soln2(input: string) : void {
    let total = 0;
    input.split("\n").forEach(line => {
        let output = line.split("|");
        let words = output[0].split(" ");
        let four: string[] = [];
        let one: string[] = [];

        words.forEach(val => {
            let letters = val.split("");
            switch(val.length) {
                case 2:
                    one = letters;
                    break;
                case 4:
                    four = letters;
                    break;
            }
        });

        let out = output[1].split(" ").filter(val => val != "");
        let lineVal = 0;
        out.forEach((num, idx) => {
            let val = 0;
            let oneOverlap = num.split("").filter(char => one.includes(char));
            let fourOverlap = num.split("").filter(char => four.includes(char));
            switch (num.length) {
                case 2: val = 1; break;
                case 3: val = 7; break;
                case 4: val = 4; break;
                case 7: val = 8; break;
                case 5:
                    if (oneOverlap.length == 2) {
                        val = 3;
                    } else {
                        val = fourOverlap.length == 2 ? 2 : 5;
                    }
                    break;
                case 6:
                    if (oneOverlap.length == 1) {
                        val = 6;
                    } else {
                        val = fourOverlap.length == 4 ? 9 : 0;
                    }
            }
            lineVal += (val * Math.pow(10, 3 - idx));
        });
        total += lineVal;
    });

    console.log(total);
}

export const soln : SolnExport = {
    desc: "Seven Segment Search",
    part1: soln1,
    part2: soln2,
};