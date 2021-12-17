import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Position {
    x: number,
    y: number
}

interface Target {
    one: Position,
    two: Position,
}

function iterate(target: Target, vel: Position) {
    let x = 0, y = 0;
    
    let maxHeight = Number.NEGATIVE_INFINITY;

    while (x <= target.two.x && y >= target.two.y) {
        x += vel.x;
        y += vel.y;
        if (y > maxHeight) maxHeight = y;
        vel.x -= Math.sign(vel.x);
        vel.y -= 1;
        if (x >= target.one.x && x <= target.two.x && y <= target.one.y && y >= target.two.y) {
            return maxHeight;
        }
    }

    return Number.NEGATIVE_INFINITY;
}

function soln1(input: string) : void {
    let targetStr = input.substring(13).split(", ").map(val => val.substring(2).split("..").map(tar => parseInt(tar)));
    let target: Target = {
        one: { x: targetStr[0][0], y: targetStr[1][1] },
        two: { x: targetStr[0][1], y: targetStr[1][0] }
    }

    let x = 0;
    while ((x * (x + 1)) / 2 < target.one.x) {
        x++;
    }

    let y = 0;
    let max = Number.NEGATIVE_INFINITY;
    while (y < 200) {
        let curMax = iterate(target, {x: x, y: y});
        y++;
        if (!isFinite(curMax)) continue;
        if (curMax > max) max = curMax;
    }

    console.log(max);
}

function soln2(input: string) : void {
    let targetStr = input.substring(13).split(", ").map(val => val.substring(2).split("..").map(tar => parseInt(tar)));
    let target: Target = {
        one: { x: targetStr[0][0], y: targetStr[1][1] },
        two: { x: targetStr[0][1], y: targetStr[1][0] }
    }

    let hits = 0;

    for (let x = 0; x < 300; x++) {
        for (let y = -100; y < 100; y++) {
            let curMax = iterate(target, {x: x, y: y});
            if (isFinite(curMax)) hits++;
        }
    }

    console.log(hits);
}

export const soln : SolnExport = {
    desc: "Trick Shot",
    part1: soln1,
    part2: soln2,
};