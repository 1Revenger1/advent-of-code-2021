import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function checkVals (map: number[][], x: number, y:number, maxX: number, maxY :number) {
    let val = map[y][x];
    let adj = [];
    if (x != 0) adj.push(map[y][x - 1]);
    if (x != maxX - 1) adj.push(map[y][x + 1]);
    if (y != 0) adj.push(map[y - 1][x]);
    if (y != maxY - 1) adj.push(map[y + 1][x]);
    let filt = adj.filter(a => val < a);
    return filt.length == adj.length;
}

function soln1(input: string) : void {
    let map = input.split("\n").map(row => row.split("").map(val => parseInt(val)));

    let lastIdx = map.length;
    let total = 0;
    map.forEach((row, y) => {
        row.forEach((val, x) => {
            if (!checkVals(map, x, y, row.length, lastIdx)) return;
            total += val + 1;
        });
    });

    console.log(total);
}

interface Position {
    x: number,
    y: number,
}

function visitIncludes(visit: Position[], pos: Position) {
    for (let visited of visit) {
        if (visited.x == pos.x &&
            visited.y == pos.y) return true;
    }
    return false;
}

function addPos (queue: Position[], x: number, y: number) {
    let pos = {x: x, y: y};
    queue.push(pos);
}

function checkBasin (map: number[][], x: number, y: number, maxX: number, maxY: number) : number {
    let basin = [ ];
    let queue = [ {x: x, y: y } ];
    let visit = [];

    while (queue.length != 0) {
        let pos = queue.pop()!;
        if (visitIncludes(visit, pos)) continue;
        visit.push(pos);
        if (map[pos.y][pos.x] == 9) continue;
        basin.push(map[pos.y][pos.x]);

        if (pos.x != 0) {
            addPos(queue, pos.x - 1, pos.y);
        }
        if (pos.x != maxX - 1) {
            addPos(queue, pos.x + 1, pos.y);
        }
        if (pos.y != 0) {
            addPos(queue, pos.x, pos.y - 1);
        }
        if (pos.y != maxY - 1) {
            addPos(queue, pos.x, pos.y + 1);
        }
    }

    return basin.length;
}

function soln2(input: string) : void {
    let map = input.split("\n").map(row => row.split("").map(val => parseInt(val)));

    let lastIdx = map.length;
    let basinSizes: number[] = [];
    map.forEach((row, y) => {
        row.forEach((val, x) => {
            if (!checkVals(map, x, y, row.length, lastIdx)) return;
            basinSizes.push(checkBasin(map, x, y, row.length, lastIdx));
        });
    });

    let sorted = basinSizes.sort((a, b) => b - a);
    let total = sorted[0] * sorted[1] * sorted[2];

    console.log(total);
}

export const soln : SolnExport = {
    desc: "Smoke Basin",
    part1: soln1,
    part2: soln2,
};