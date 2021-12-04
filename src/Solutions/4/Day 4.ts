import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

function createBoards(inputSplit: string[]) : number[][][] {
    let boards : number[][][] = [];

    for (let i = 1; i < inputSplit.length; i++) {
        let board = inputSplit[i];
        boards.push(board.split("\n")
                         .map(row => row.split(" ")
                                        .filter(value => value != "")
                                        .map(val => parseInt(val))));
    }

    return boards;
}

function checkSingleBingo(board: number[][]) : boolean {    
    // Check rows
    for (let i = 0; i < 5; i++) {
        let total = board[i].filter (value => value == -1).length;
        if (total == 5) return true;
    }

    for (let i = 0; i < 5; i++) {
        let total = 0;
        for (let j = 0; j < 5; j++) {
            if (board[j][i] == -1) total++;
        }

        if (total == 5) return true;
    }

    return false;
}

function soln1(input: string) : void {
    let inputSplit = input.split("\n\n");
    let nums = inputSplit[0].split(",").map(val => parseInt(val));
    let boards = createBoards(inputSplit);

    while (true) {
        if (nums.length == 0) { return; }
        let num = nums.shift()!;

        boards.forEach(board => {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (board[i][j] == num) board[i][j] = -1;
                }
            }
        });

        let solved = -1;
        for (let i = 0; i < boards.length; i++) {
            if (checkSingleBingo(boards[i]))
                solved = i;
        }

        if (solved != -1) {
            let total = 0;
            boards[solved].forEach(row => row.forEach(val => {
                if (val != -1) total += val;
            }));

            console.log(total);
            console.log(total * num);
            break;
        }
    }
}

function soln2(input: string) : void {
    let inputSplit = input.split("\n\n");
    let nums = inputSplit[0].split(",").map(val => parseInt(val));
    let boards = createBoards(inputSplit);

    while (true) {
        if (nums.length == 0) { return; }
        let num = nums.shift()!;

        boards.forEach(board => {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (board[i][j] == num) board[i][j] = -1;
                }
            }
        });

        let size = boards.length;
        if (size == 1 && checkSingleBingo(boards[0])) {         
            let total = 0;
            boards[0].forEach(row => row.forEach(val => {
                if (val != -1) total += val;
            }));

            console.log(total);
            console.log(total * num);
            break;
        }

        boards.forEach((board, idx) => {
            if (checkSingleBingo(board)) boards.splice (idx, 1);
        });
    }
}

export const soln : SolnExport = {
    desc: "Giant Squid",
    part1: soln1,
    part2: soln2,
};