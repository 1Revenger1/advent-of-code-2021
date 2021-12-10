import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Match {
    char: string,
    score: number,
}

const matches: any = {
    ")": {char: "(", score: 3},
    "]": {char: "[", score: 57},
    "}": {char: "{", score: 1197},
    ">": {char: "<", score: 25137},
}

function soln1(input: string) : void {
    let total = 0;
    
    input.split("\n").forEach(row => {
        let stack : string[] = [];
        let splitRow = row.split("");
        for (let char of splitRow) {
            if (["(", "[", "{", "<"].includes(char)) {
                stack.push(char);
                continue;
            }

            let match : Match = matches[char];
            if (match.char != stack.pop()) {
                total += match.score;
                break;
            }
        };
    });

    console.log(total);
}

function soln2(input: string) : void {
    // paren, square bracket, curly bracket, arrow
    let totals : number[] = [];
    input.split("\n").forEach(row => {
        let stack : string[] = [];
        let splitRow = row.split("");
        for (let char of splitRow) {
            if (["(", "[", "{", "<"].includes(char)) {
                stack.push(char);
                continue;
            }

            let match : Match = matches[char];
            if (match.char != stack.pop()) {
                return;
            }
        };

        let total = 0;
        while (stack.length) {
            let char = stack.pop();
            total *= 5;
            if (char == "(") total += 1;
            if (char == "[") total += 2;
            if (char == "{") total += 3;
            if (char == "<") total += 4;
        }
        
        totals.push(total);
    });

    totals.sort((a, b) => a - b);
    console.log(totals[Math.floor(totals.length / 2)]);
}

export const soln : SolnExport = {
    desc: "Syntax Scoring",
    part1: soln1,
    part2: soln2,
};