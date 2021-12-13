import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

interface Node {
    name: string,
    isSmall: boolean,
    childs: Node[],
}

// Guaranteed to always return a node
function getNode (map: Map<string, Node>, name: string) : Node {
    if (map.has(name)) return map.get(name)!;

    let node : Node = {
        name: name,
        isSmall: name.toLowerCase() == name,
        childs: []
    };
    map.set(name, node);
    return node;
}

function walkGraph (map: Map<string, Node>, start: Node, path: Node[]) {
    if (start.name == "end") return 1;
    if (start.isSmall && path.includes(start)) return 0;

    path.push(start);
    let total = 0;

    start.childs.forEach(child => {
        total += walkGraph (map, child, path);
    });

    path.pop();

    return total;
}

function soln1(input: string) : void {
    let nodes = new Map<string, Node>();

    input.split("\n").forEach(row => {
        let vectors = row.split("-");
        let parentNode = getNode (nodes, vectors[0]);
        let childNode = getNode (nodes, vectors[1]);
        parentNode.childs.push(childNode);
        childNode.childs.push(parentNode);
    });

    let paths = walkGraph (nodes, getNode(nodes, "start"), []);
    console.log(paths);
}

function includesTwoSmall (path: Node[], node: Node) {
    let smallNodes = path.filter(val => val.isSmall);
    smallNodes.sort((a, b) => a.name.localeCompare(b.name));

    let maxIdx = smallNodes.length;
    for (let i = 1; i < maxIdx; i++) {
        if (smallNodes[i] == smallNodes[i - 1]) {
            return path.includes(node);
        }
    }

    return false;
}

function walkGraphMultipleSmall (map: Map<string, Node>, start: Node, path: Node[]) {
    if (start.name == "end") return 1;
    if (start.name == "start" && path.length != 0) return 0;
    if (start.isSmall && includesTwoSmall(path, start)) return 0;

    path.push(start);
    let total = 0;

    start.childs.forEach(child => {
        total += walkGraphMultipleSmall (map, child, path);
    });

    path.pop();

    return total;
}

function soln2(input: string) : void {
    let nodes = new Map<string, Node>();

    input.split("\n").forEach(row => {
        let vectors = row.split("-");
        let parentNode = getNode (nodes, vectors[0]);
        let childNode = getNode (nodes, vectors[1]);
        parentNode.childs.push(childNode);
        childNode.childs.push(parentNode);
    });

    let paths = walkGraphMultipleSmall (nodes, getNode(nodes, "start"), []);
    console.log(paths);
}

export const soln : SolnExport = {
    desc: "Solution Template",
    part1: soln1,
    part2: soln2,
};