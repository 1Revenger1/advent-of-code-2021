import * as chalk from "chalk";
import { SolnExport } from "../../SolnExport";

enum PacketType {
    SUM     = 0x00,
    PRODUCT = 0x01,
    MIN     = 0x02,
    MAX     = 0x03,
    LITERAL = 0x04,
    GREATER = 0x05,
    LESS    = 0x06,
    EQUAL   = 0x07,
}

interface Packet {
    version: number,
    type: PacketType,
    size: number,
    subpackets : Packet[];
    value : number;
}

const HEADER_LENGTH = 6;
const SUBPACKET_SIZE = 11;
const SUBPACKET_LENGTH = 15;

function readNBit(buf: number[], off: number, size: number) {
    let val = 0;
    for (let i = 0; i < size; i++) {
        val |= (buf[off + i]) << (size - i - 1);
    }
    return val;
}

function read3Bit(buf: number[], off: number) {
    return (buf[off] << 2) | (buf[off + 1] << 1) | buf[off + 2];
}

function doOperation(packet: Packet) {
    let subpackets = packet.subpackets;
    
    switch (packet.type) {
        case PacketType.SUM:
            for (let i = 0; i < subpackets.length; i++) {
                packet.value += subpackets[i].value;
            }
            break;
        case PacketType.PRODUCT:
            packet.value = packet.subpackets[0].value;
            for (let i = 1; i < subpackets.length; i++) {
                packet.value *= subpackets[i].value;
            }
            break;
        case PacketType.MIN:
            packet.value = Infinity;
            for (let i = 0; i < subpackets.length; i++) {
                packet.value = Math.min(packet.value, subpackets[i].value);
            }
            break;
        case PacketType.MAX:
            packet.value = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < subpackets.length; i++) {
                packet.value = Math.max(packet.value, subpackets[i].value);
            }
            break;
        case PacketType.GREATER:
            let greaterRes = subpackets[0].value > subpackets[1].value;
            packet.value = greaterRes ? 1 : 0;
            break;
        case PacketType.LESS:
            let lessRes = subpackets[0].value < subpackets[1].value;
            packet.value = lessRes ? 1 : 0;
            break;
        case PacketType.EQUAL:
            let equalRes = subpackets[0].value == subpackets[1].value;
            packet.value = equalRes ? 1 : 0;
            break;
    }
}

function parsePackets(buf: number[], off: number) : Packet {
    let packet : Packet = {
        version: read3Bit(buf, off),
        type: read3Bit(buf, off + 3),
        size: HEADER_LENGTH,
        subpackets: [],
        value: 0,
    };

    off += HEADER_LENGTH;

    // Literal packet, does not have any subpackets
    if (packet.type == PacketType.LITERAL) {
        let i = 0;
        packet.value = 0;
        do {
            let val = readNBit(buf, off, 5);
            packet.value = (packet.value * 16) + (val & 0xF);
            off += 5;
            i++;
            if (((val >> 4) & 0x1) == 0) break;
        } while(1);

        packet.size += 5 * i;
        return packet;
    }

    let size = buf[off];
    off += 1;
    packet.size += 1;

    // We have number of subpackets
    if (size == 1) {
        let numSubPackets = readNBit(buf, off, SUBPACKET_SIZE);
        off += SUBPACKET_SIZE;
        packet.size += SUBPACKET_SIZE;
        while (numSubPackets > 0) {
            let subpacket = parsePackets(buf, off);
            packet.subpackets.push(subpacket);
            numSubPackets--;
            off += subpacket.size;
            packet.size += subpacket.size;
        }
    // We have length of all subpackets
    } else {
        let length = readNBit(buf, off, SUBPACKET_LENGTH);
        off += SUBPACKET_LENGTH;
        packet.size += length + SUBPACKET_LENGTH;
        while (length > 0) {
            let subpacket = parsePackets(buf, off);
            packet.subpackets.push(subpacket);
            off += subpacket.size;
            length -= subpacket.size;
        }
    }

    doOperation(packet);
    return packet;
}

function hexToBinary(a: string) {
    switch (a) {
        case "0": return [0, 0, 0, 0];
        case "1": return [0, 0, 0, 1];
        case "2": return [0, 0, 1, 0];
        case "3": return [0, 0, 1, 1];
        case "4": return [0, 1, 0, 0];
        case "5": return [0, 1, 0, 1];
        case "6": return [0, 1, 1, 0];
        case "7": return [0, 1, 1, 1];
        case "8": return [1, 0, 0, 0];
        case "9": return [1, 0, 0, 1];
        case "A": return [1, 0, 1, 0];
        case "B": return [1, 0, 1, 1];
        case "C": return [1, 1, 0, 0];
        case "D": return [1, 1, 0, 1];
        case "E": return [1, 1, 1, 0];
        case "F": return [1, 1, 1, 1];
    }
    return 0;
}

function getVersion(pack: Packet) : number {
    let total = pack.version;
    pack.subpackets.forEach(val => {
        total += getVersion(val);
    });
    return total;
}

function soln1(input: string) : void {
    let buf : number[] = [];
    input.split("").forEach(val => {
        if (val == "\n") return;
        buf = buf.concat(hexToBinary(val));
    });
    let packets = parsePackets(buf, 0);
    let total = getVersion(packets);
    console.log(total);

}

function soln2(input: string) : void {
    let buf : number[] = [];
    input.split("").forEach(val => {
        if (val == "\n") return;
        buf = buf.concat(hexToBinary(val));
    });
    let packets = parsePackets(buf, 0);
    console.log(packets.value);
}

export const soln : SolnExport = {
    desc: "Packet Decoder",
    part1: soln1,
    part2: soln2,
};