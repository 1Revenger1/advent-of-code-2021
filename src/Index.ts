import chalk from "chalk";
import { readdirSync, readFileSync, Dirent } from "fs";
import { SolnExport } from "./SolnExport";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface Soln {
    desc: string,
    input: string,
    export: SolnExport,
}

function header() {
    console.log(chalk.green("+-----------------------+"));
    console.log(chalk.green("|  ") + chalk.blueBright("Advent of Code 2021") + chalk.green("  |"));
    console.log(chalk.green("+-----------------------+\n"));
}

async function grabUserInput() {
    return new Promise<string>((resolve) => {
        rl.question("Choose which day to run: ", resolve);
    });
}

function grabSolution(dir: Dirent): Soln {
    const input = readFileSync(`Inputs/Input${dir.name}.txt`, { encoding: "utf8" });
    const day = require(`./Solutions/${dir.name}/Day ${dir.name}.js`);
    const dayExport : SolnExport = day.soln;

    return {
        desc: dayExport.desc,
        input: input,
        export: dayExport,
    };
}

(async () => {
    header();

    const result = readdirSync("./bin/Solutions", { withFileTypes: true });

    // Grab solutions and their inputs
    const solutions = result.filter((dir) => dir.isDirectory())
                            .map((dir) => grabSolution(dir));

    const argc = process.argv.length;
    let num = 0;
    if (argc == 3) {
        num = parseInt(process.argv[2]);
    } else {
        solutions.forEach((value, i) => {
            console.log(chalk.blueBright(i) + ": Day " + value.desc);
        });
    
        console.log();
        const select = await grabUserInput();
        num = parseInt(select);
    }

    rl.close();
    if (num >= solutions.length || num < 0) {
        console.error("Invalid selection");
        return;
    }
    
    const solution = solutions[num];
    const solExport = solution.export;
    solExport.part1(solution.input);
    solExport.part2(solution.input);
})();