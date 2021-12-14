import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Rule {
    match: string,
    insert: string,
}

function findRule (rules: Rule[], match: string) {
    for (let rule of rules) {
        if (rule.match == match) {
            return rule.insert;
        }
    }

    return "";
}

function soln1(input: string) : void {
    let rows = input.split("\n");
    let template: string = rows.shift()!;
    rows.unshift(); // Remove empty row

    let rules: Rule[] = rows.map(val => {
        let rule = val.split(' -> ');
        return { match: rule[0], insert: rule[1] };
    });

    let steps = 10;
    for (let i = 0; i < steps; i++) {
        let nextStep = "";

        for (let j = 1; j < template.length; j++) {
            let match = template.substring(j - 1, j + 1);
            let insert = findRule (rules, match);
            nextStep += template[j - 1] + insert;
        }

        nextStep += template[template.length - 1];
        template = nextStep;
    }

    let totals = new Map<string, number>();
    for (let i = 0; i < template.length; i++) {
        let char = template.charAt(i);
        let charTotal = 0;
        if (totals.has(char)) charTotal = totals.get(char)!;
        charTotal++;
        totals.set(char, charTotal);
    }

    let min = 100000000000;
    let max = 0;
    totals.forEach((val, key) => {
        min = Math.min(val, min);
        max = Math.max(val, max);
    });

    console.log(max - min);
}

function soln2(input: string) : void {
    let totalMatches = new Map<string, number>();
    let totalChars = new Map<string, number>();
    let rules = new Map<string,string>();
    let steps = 40;

    let rows = input.split("\n");
    let template: string = rows.shift()!;

    rows.shift(); // Remove empty row
    rows.forEach(val => {
        let rule = val.split(' -> ');
        rules.set(rule[0], rule[1]);
        totalMatches.set(rule[0], 0);
    });

    for (let i = 1; i < template.length; i++) {
        let char1 = template.charAt(i - 1);
        let char2 = template.charAt(i);
        let total = totalMatches.get(char1 + char2)!;
        totalMatches.set(char1 + char2, total + 1);
    }

    for (let i = 0; i < steps; i++) {
        let nextStep = new Map<string, number>();
        totalMatches.forEach((val, key) => nextStep.set(key, 0));

        rules.forEach((insert, match) => {
            let match1 = match.charAt(0) + insert;
            let match2 = insert + match.charAt(1);
            let total = totalMatches.get(match)!;
            let match1Total = nextStep.get(match1)!;
            let match2Total = nextStep.get(match2)!;
            nextStep.set(match1, match1Total + total);
            nextStep.set(match2, match2Total + total);
        });

        totalMatches = nextStep;
    }

    totalMatches.forEach((num, match) => {
        let char1 = match.charAt(0);
        let char1Total = 0;
        if (totalChars.has(char1)) char1Total = totalChars.get(char1)!;
        totalChars.set(char1, char1Total + num);
    });

    let lastChar = template.charAt(template.length - 1);
    totalChars.set(lastChar, totalChars.get(lastChar)! + 1);

    console.log(totalChars);
    let min = 1000000000000000;
    let max = 0;
    totalChars.forEach((val, key) => {
        min = Math.min(val, min);
        max = Math.max(val, max);
    });

    console.log(max - min);
}

export const soln : SolnExport = {
    desc: "Extended Polymerization",
    part1: soln1,
    part2: soln2,
};