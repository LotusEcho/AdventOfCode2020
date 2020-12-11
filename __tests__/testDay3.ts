import {detectCollision, doPathing, MapRow, Sled} from "../lib/day3/day3";
import {readInputToList} from "../lib/common/readfile";

let testMap = [new MapRow("..##......."), new MapRow("#...#...#.."),
    new MapRow(".#....#..#."), new MapRow("..#.#...#.#"),
    new MapRow(".#...##..#."), new MapRow("..#.##....."),
    new MapRow(".#.#.#....#"), new MapRow(".#........#"),
    new MapRow("#.##...#..."), new MapRow("#...##....#"),
    new MapRow(".#..#...#.#")];

test('testDetectCollision with no collision', () => {
    let sled = Sled.partOneSled();
    sled.move();
    expect(sled.x).toBe(3);
    expect(sled.y).toBe(1);
    expect(detectCollision(sled, testMap)).toBeFalsy();
});

test('testDetectCollision with collision', () => {
    let sled = Sled.partOneSled();
    sled.move();
    expect(sled.x).toBe(3);
    expect(sled.y).toBe(1);
    sled.move();
    expect(sled.x).toBe(6);
    expect(sled.y).toBe(2);
    expect(detectCollision(sled, testMap)).toBeTruthy();
})

test('test part1 pathing with test input', () => {
    expect(doPathing([Sled.partOneSled()], testMap)).toBe(7);
});

test('test part1 pathing with test text file input', () => {
    return readInputToList('./input/day3_test.txt').then(value => {
        expect(doPathing([Sled.partOneSled()], value.map(rowString => new MapRow(rowString)))).toBe(7);
    })

});

test('test part1 pathing with real text file input', () => {
    return readInputToList('./input/day3_input.txt').then(value => {
        let answer = doPathing([Sled.partOneSled()], value.map(rowString => new MapRow(rowString)));
        console.log("Part 1 Answer: " + answer);
        expect(answer).toBeGreaterThan(0);
    })
});
/*
Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
 */
test('test part2 pathing with test text file input', () => {
    return readInputToList('./input/day3_test.txt').then(value => {
        expect(doPathing([new Sled(1,1), Sled.partOneSled(),
            new Sled(5, 1), new Sled(7,1),
            new Sled(1,2) ], value.map(rowString => new MapRow(rowString)))).toBe(336);
    })

});

test('test part2 pathing with real text file input', () => {
    return readInputToList('./input/day3_input.txt').then(value => {
        let answer = doPathing([new Sled(1,1), Sled.partOneSled(),
            new Sled(5, 1), new Sled(7,1),
            new Sled(1,2) ], value.map(rowString => new MapRow(rowString)));
        console.log("Part 2 answer: " + answer);
        expect(answer).toBeGreaterThan(0);
    })
});
