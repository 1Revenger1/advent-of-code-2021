import * as chalk from "chalk";
import { nextTick } from "process";
import { SolnExport } from "../../SolnExport";

function flash (map: number[][], x: number, y: number) : number {
    let minX = Math.max(0, x - 1);
    let maxX = Math.min(9, x + 1);
    let minY = Math.max(0, y - 1);
    let maxY = Math.min(9, y + 1);

    if (map[y][x] == 0) return 0;
    map[y][x]++;
    if (map[y][x] <= 9) return 0;

    map[y][x] = 0;
    let flashes = 1;

    for (let iy = minY; iy <= maxY; iy++) {
        for (let ix = minX; ix <= maxX; ix++) {
            flashes += flash (map, ix, iy);
        }
    }

    return flashes;
}

function soln1(input: string) : void {
    let map = input.split("\n").map(row => row.split("").map(val => parseInt(val)));

    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        map.forEach((row, y) => row.forEach((val, x) => map[y][x]++));
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (map[y][x] > 9) {
                    flashes += flash (map, x, y);
                }
            }
        }
    }

    console.log(flashes);
}

function soln2(input: string) : void {
    let map = input.split("\n").map(row => row.split("").map(val => parseInt(val)));

    let flashes = 0;
    let i = 0;
    while (true) {
        console.log(`Step ${i++}`);
        map.forEach((row, y) => row.forEach((val, x) => map[y][x]++));
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (map[y][x] > 9) {
                    flashes += flash (map, x, y);
                }
            }
        }

        if (map.reduce((prev, next) => prev += next.filter(val => val != 0).length, 0) == 0) break;
    }

    console.log(i);
}

export const soln : SolnExport = {
    desc: "Dumbo Octopus",
    part1: soln1,
    part2: soln2,
};