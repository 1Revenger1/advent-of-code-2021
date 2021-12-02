import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let depth = 0;
    let forward = 0;

    input.split("\n").forEach (value => {
        let values = value.split(" ");
        let x = parseInt(values[1]);

        if (values[0] == "forward") {
            forward += x;
        } else if (values[0] == "down") {
            depth += x;
        } else if (values[0] == "up") {
            depth -= x;
        }
    });

    console.log(depth * forward);
}

function soln2(input: string) : void {
    let depth = 0;
    let forward = 0;
    let aim = 0;

    input.split("\n").forEach (value => {
        let values = value.split(" ");
        let x = parseInt(values[1]);

        if (values[0] == "forward") {
            forward += x;
            depth += aim * x;
        } else if (values[0] == "down") {
            aim += x;
        } else if (values[0] == "up") {
            aim -= x;
        }
    });

    console.log(depth * forward);
}

export const soln : SolnExport = {
    desc: "Dive!",
    part1: soln1,
    part2: soln2,
};