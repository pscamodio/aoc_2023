import { createSolver } from "../utils/aoc.ts";
import { isNonEmpty } from "../utils/string.ts";

const DEMO_INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

const CARDS = "23456789TJQKA" as const;
const CARDS_2 = "J23456789TQKA" as const;

enum PlayType {
    HighCard = 1,
    OnePair = 2,
    TwoPair = 3,
    Tris = 4,
    FullHouse = 5,
    Poker = 6,
    FiveOfAKind = 7,
}

type Hand = {
    play: string;
    type: PlayType;
    bid: number;
}

function countCards(hand: string) : Map<string, number> {
    const count = new Map<string, number>();
    for (const char of hand) {
        const val = count.get(char) ?? 0;
        count.set(char, val + 1);
    }
    return count;
}

function applyJockers(counts: Map<string, number>): void {
    const jokers = counts.get("J");
    if (!jokers || jokers === 5) return;

    counts.delete("J");

    const max = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];
    counts.set(max[0], max[1] + jokers);
}

function handType(counts: Map<string, number>): PlayType {
    const values = Array.from(counts.values());
    if (values.includes(5)) {
        return PlayType.FiveOfAKind;
    }
    if (values.includes(4)) {
        return PlayType.Poker;
    }
    if (values.includes(3) && values.includes(2)) {
        return PlayType.FullHouse;
    }
    if (values.includes(3)) {
        return PlayType.Tris;
    }
    if (values.filter((v) => v ==2).length  == 2) {
        return PlayType.TwoPair;
    }
    if (values.includes(2)) {
        return PlayType.OnePair;
    }
    return PlayType.HighCard;
}

function parseHand(line: string): Hand {
    const [hand, bid] = line.split(" ");
    const counts = countCards(hand);
    return {
        play: hand,
        bid: parseFloat(bid),
        type: handType(counts)
    }
}

function parseHand2(line: string): Hand {
    const [hand, bid] = line.split(" ");
    const counts = countCards(hand);
    applyJockers(counts);
    return {
        play: hand,
        bid: parseFloat(bid),
        type: handType(counts)
    }
}

function handOrder(a: Hand, b: Hand): number {
    if (a.type != b.type) {
        return a.type - b.type;
    }
    for (let i=0; i!=5; ++i) {
        if (a.play[i] != b.play[i]) {
            return CARDS.indexOf(a.play[i]) - CARDS.indexOf(b.play[i]);
        }
    }
    return 0;
}

function handOrder2(a: Hand, b: Hand): number {
    if (a.type != b.type) {
        return a.type - b.type;
    }
    for (let i=0; i!=5; ++i) {
        if (a.play[i] != b.play[i]) {
            return CARDS_2.indexOf(a.play[i]) - CARDS_2.indexOf(b.play[i]);
        }
    }

    return 0;
}
function computeWinning(hands: Hand[]) : number {
    let win = 0;
    for (const [index, hand] of hands.entries()) {
        win += hand.bid * (index + 1);
    }
    return win;
}

function solve1(input = DEMO_INPUT): string {
    const hands = input.split("\n").filter(isNonEmpty).map(parseHand).sort(handOrder);
    return computeWinning(hands).toString();
}

function solve2(input = DEMO_INPUT): string {
    const hands = input.split("\n").filter(isNonEmpty).map(parseHand2).sort(handOrder2);
    return computeWinning(hands).toString();
}

export const solve = createSolver(solve1, solve2);
