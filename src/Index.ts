import chalk from "chalk";
import { readdirSync, readFileSync, Dirent } from "fs";
import { SolnExport } from "./SolnExport";
import * as readline from "readline";
import { cwd } from "process";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface Soln {
    day: number,
    desc: string,
    input: string,
    export: SolnExport,
}

function header() {
    console.log(chalk.green("+-----------------------+"));
    console.log(chalk.green("|  ") + chalk.blueBright("Advent of Code 2021") + chalk.green("  |"));
    console.log(chalk.green("+-----------------------+\n"));
}

// Make rl.question a promise
async function grabUserInput() {
    return new Promise<string>((resolve) => {
        rl.question("Choose which day to run: ", resolve);
    });
}

// Get input file, description, and module for the day in "dir"
function grabSolution(dir: Dirent): Soln {
    const path = `${process.cwd()}/src/Solutions/${dir.name}`;
    const input = readFileSync(`${path}/Input.txt`, { encoding: "utf8" });
    const day = require(`./Solutions/${dir.name}/Day ${dir.name}.js`);
    const dayExport : SolnExport = day.soln;

    return {
        day: parseInt(dir.name),
        desc: dayExport.desc,
        input: input,
        export: dayExport,
    };
}

async function timePart(soln: (input: string) => void, input: string) {
    const startTime = new Date().getTime();
    soln(input);
    const endTime = new Date().getTime();
    return endTime - startTime;
}

(async () => {
    header();

    const result = readdirSync("./bin/Solutions", { withFileTypes: true });

    // Grab solutions and their inputs
    const solutions = result.filter((dir) => dir.isDirectory())
                            .map((dir) => grabSolution(dir))
                            .sort((a, b) => a.day - b.day);

    // Get day we should run
    let num = 0;
    if (process.argv.length == 3) {
        num = parseInt(process.argv[2]);
    } else {
        solutions.forEach((value, i) => {
            console.log(chalk.blueBright(i) + ": " + value.desc);
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
    
    // Run selected day
    const solution = solutions[num];
    const solExport = solution.export;
    const timePart1 = await timePart(solExport.part1, solution.input);
    console.log("Part 1 took... " + timePart1 + " ms");
    const timePart2 = await timePart(solExport.part2, solution.input);
    console.log("Part 2 took... " + timePart2 + " ms");
})();