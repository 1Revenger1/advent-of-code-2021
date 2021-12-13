import chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Position { x: number, y: number };

function soln1(input: string) : void {
    let fillInMap = true;
    let firstFoldDone = false;
    let pos : Position[] = [];
    input.split("\n").forEach(row => {
        if (fillInMap) {
            if (row == "") {
                fillInMap = false;
                return;
            }

            let vals = row.split(',').map(val => parseInt(val));
            pos.push({ x: vals[0], y: vals[1] });
            return;
        }

        if (firstFoldDone) return;
        firstFoldDone = true;
        let fold = row.split(" ")[2].split("=");
        let foldAround = parseInt(fold[1]);
        if (fold[0] == "y") {   
            pos.map(pos => {
                let diff = pos.y - foldAround;
                if (diff > 0) pos.y -= (diff * 2);
            });
        } else {
            pos.map(pos => {
                let diff = pos.x - foldAround;
                if (diff > 0) pos.x -= (diff * 2);
            })
        }
    });

    pos = pos.filter((val, idx) => {
        for (let i = 0; i < pos.length; i++) {
            let loc = pos[i];
            if (i == idx) return true;
            if (loc.x == val.x &&
                loc.y == val.y) return false;
        }

        return true;
    });

    console.log(pos.length);
}

function soln2(input: string) : void {
    let fillInMap = true;
    let pos : Position[] = [];
    input.split("\n").forEach(row => {
        if (fillInMap) {
            if (row == "") {
                fillInMap = false;
                return;
            }

            let vals = row.split(',').map(val => parseInt(val));
            pos.push({ x: vals[0], y: vals[1] });
            return;
        }
        
        let fold = row.split(" ")[2].split("=");
        let foldAround = parseInt(fold[1]);
        if (fold[0] == "y") {   
            pos.map(pos => {
                let diff = pos.y - foldAround;
                if (diff > 0) pos.y -= (diff * 2);
            });
        } else {
            pos.map(pos => {
                let diff = pos.x - foldAround;
                if (diff > 0) pos.x -= (diff * 2);
            })
        }
    });

    pos = pos.filter((val, idx) => {
        for (let i = 0; i < pos.length; i++) {
            let loc = pos[i];
            if (i == idx) return true;
            if (loc.x == val.x &&
                loc.y == val.y) return false;
        }

        return true;
    });

    let maxX = 0;
    let maxY = 0;
    pos.forEach(val => {
        if (val.x > maxX) maxX = val.x;
        if (val.y > maxY) maxY = val.y;
    });
    
    let print: string[][] = [];
    for (let i = 0; i < maxY + 1; i++) {
        print.push(new Array(maxX + 1).fill(" "));
    }

    pos.forEach(val => {
        print[val.y][val.x] = chalk.green("#");
    });

    print.forEach(row => {
        console.log(row.join(""));
    });
}

export const soln : SolnExport = {
    desc: "Solution Template",
    part1: soln1,
    part2: soln2,
};