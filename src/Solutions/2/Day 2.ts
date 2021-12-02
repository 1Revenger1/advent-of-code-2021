import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function soln1(input: string) : void {
    let depth = 0;
    let forward = 0;

    input.split("\n").forEach (value => {
        let values = value.split(" ");
        if (values[0] == "forward") {
            forward += parseInt(values[1]);
        } else if (values[0] == "down") {
            depth += parseInt(values[1]);
        } else if (values[0] == "up") {
            depth -= parseInt(values[1]);
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
        if (values[0] == "forward") {
            forward += parseInt(values[1]);
            depth += aim * parseInt(values[1]);
        } else if (values[0] == "down") {
            aim += parseInt(values[1]);
        } else if (values[0] == "up") {
            aim -= parseInt(values[1]);
        }
    });

    console.log(depth * forward);
}

export const soln : SolnExport = {
    desc: "Dive!",
    part1: soln1,
    part2: soln2,
};