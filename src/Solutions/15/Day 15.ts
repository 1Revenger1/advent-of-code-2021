import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Position {
    x: number,
    y: number
}

function getMin(queue: Position[], memory : number[][]) : Position {
    let min = Infinity;
    let minPos = 0;
    for (let i = 0; i < queue.length; i++) {
        let {x, y} = queue[i];
        if (memory[y][x] < min) {
            minPos = i;
            min = memory[y][x];
        }
    }

    return queue.splice(minPos, 1)[0];
}

function posInQueue(x: number, y: number, queue: Position[]) {
    for (let match of queue) {
        if (match.x == x && match.y == y) return true;
    }
    return false;
}

function getNeighbors(min: Position, queue: Position[]) {
    let pos : Position[] = [];
    let {x, y} = min;

    if (posInQueue(x - 1, y, queue)) pos.push({x: x - 1, y: y});
    if (posInQueue(x + 1, y, queue)) pos.push({x: x + 1, y: y});
    if (posInQueue(x, y - 1, queue)) pos.push({x: x, y: y - 1});
    if (posInQueue(x, y + 1, queue)) pos.push({x: x, y: y + 1});

    return pos;
}

function djikstraSolve(map: number[][]) {
    let memory : number[][] = [];
    let queue : Position[] = [];
    for (let y = 0; y < map.length; y++) {
        memory.push(new Array(map.length).fill(Infinity));
        for (let x = 0; x < map.length; x++) {
            queue.push({x: x, y: y});
        }
    }

    memory[0][0] = 0;
    while (queue.length > 0) {
        console.log(queue.length);
        let minPos = getMin(queue, memory);
        let minVal = memory[minPos.y][minPos.x];
        let neighbors = getNeighbors(minPos, queue);
        neighbors.forEach(pos => {
            let {x, y} = pos;
            let newVal = minVal + map[y][x];
            if (newVal < memory[y][x]) {
                memory[y][x] = newVal;
            }
        });
    }

    return memory[map.length - 1][map.length - 1];
}

function solvePath(map: number[][]) {
    let memory : number[][] = [ [ 0 ] ];

    // Fill in top row
    for (let x = 1; x < map.length; x++) {
        memory[0][x] = memory[0][x - 1] + map[0][x];
    }

    // Fill in other rows
    for (let y = 1; y < map.length; y++) {
        memory.push([]);
        // First column
        memory[y][0] = memory[y - 1][0] + map[y][0];

        for (let x = 1; x < map.length; x++) {
            let curVal = map[y][x];
            let above = memory[y - 1][x];
            let left = memory[y][x - 1];
            memory[y][x] = Math.min(above, left) + curVal;
        }
    }

    return memory[map.length - 1][map.length - 1];
}

function soln1(input: string) : void {
    let map = input.split("\n").map(row => row.split("").map(val => parseInt(val)));
    let len = solvePath (map);

    console.log(len);
    console.log(djikstraSolve(map));
}

function soln2(input: string) : void {  
    let tile = input.split("\n").map(row => row.split("").map(val => parseInt(val)));
    let map : number[][] = [];

    for (let i = 0; i < tile.length * 5; i++) {
        map.push([]);
    }

    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            let baseY = tile.length * y;
            let add = x + y - 1;

            tile.forEach((row, idy) => {
                row.forEach((val, idx) => {
                    map[baseY + idy].push(((val + add) % 9) + 1);
                });
            });
        }
    }

    let len = solvePath(map);
    console.log(len);
    console.log(djikstraSolve(map));
}

export const soln : SolnExport = {
    desc: "Chiton",
    part1: soln1,
    part2: soln2,
};