import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Coordinate {
    x: number,
    y: number
}

interface Line {
    point1: Coordinate
    point2: Coordinate
}

function parseLines(input: string) : Line[] {
    let coords : Line[] = [];

    input.split("\n").forEach(line => {
        let lineCoords : Coordinate[] = line.split(" -> ").map(vals => {
            let arr = vals.split(",");
            return {
                x: parseInt(arr[0]),
                y: parseInt(arr[1]),
            }
        });

        if (lineCoords[0].x <= lineCoords[1].x) {
            coords.push({point1: lineCoords[0], point2: lineCoords[1]});
        } else {
            coords.push({point1: lineCoords[1], point2: lineCoords[0]});
        }
    });

    return coords;
}

function insertMap(map: number[][], x: number, y: number) {
    if (!map[y]) map[y] = [];
    if (!map[y][x]) map[y][x] = 0;
    map[y][x]++;
}

function soln1(input: string) : void {
    let lines = parseLines (input);
    let map : number[][] = [];

    lines.forEach(line => {
        let {point1, point2} = line;
        // Vertical
        if (point1.x == point2.x) {
            let max = Math.abs(point2.y - point1.y);
            let minY = Math.min(point2.y, point1.y);
            for (let i = 0; i <= max; i++) {
                insertMap (map, point1.x, minY + i);
            }
        // Horizontal
        } else if (point1.y == point2.y) {
            let max = point2.x - point1.x;
            for (let i = 0; i <= max; i++) {
                insertMap (map, point1.x + i, point1.y);
            }
        }
    });

    let num = 0;
    map.forEach(row => {
        num += row.filter(val => val > 1).length;
    });
    console.log(num);
}

function soln2(input: string) : void {
    let lines = parseLines (input);
    let map : number[][] = [];

    lines.forEach(line => {
        let {point1, point2} = line;
        // Vertical
        if (point1.x == point2.x) {
            let max = Math.abs(point2.y - point1.y);
            let minY = Math.min(point2.y, point1.y);
            for (let i = 0; i <= max; i++) {
                insertMap (map, point1.x, minY + i);
            }
        // Horizontal
        } else if (point1.y == point2.y) {
            let max = point2.x - point1.x;
            for (let i = 0; i <= max; i++) {
                insertMap (map, point1.x + i, point1.y);
            }
        // Diagonal
        } else {
            let dydx = (point2.y - point1.y) / (point2.x - point1.x);
            let max = point2.x - point1.x;
            for (let i = 0; i <= max; i++) {
                if (dydx == 1) insertMap (map, point1.x + i, point1.y + i);
                else insertMap (map, point1.x + i, point1.y - i);
            }
        }
    });

    let num = 0;
    map.forEach(row => {
        num += row.filter(val => val > 1).length;
    });
    console.log(num);
}

export const soln : SolnExport = {
    desc: "Hydrothermal Venture",
    part1: soln1,
    part2: soln2,
};