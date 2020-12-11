import {DBEntry, Part1Validator, Part2Validator} from "../lib/day2/dbentry";
import {getValidCountPart1, getValidCountPart2} from "../lib/day2/day2";

test('test parse dbItem format', () => {
    let expected = new DBEntry(1, 3, "a", "abcde", new Part1Validator());
    expect(DBEntry.fromDbString("1-3 a: abcde", new Part1Validator())).toMatchObject(expected);
});

test('test isValid w/ Part1Validator: valid', () => {
   expect(DBEntry.fromDbString("1-3 a: abcde", new Part1Validator()).isValid()).toBeTruthy();
});

test('test invalid w/ Part1Validator: does not contain constraint', () => {
    expect(DBEntry.fromDbString("1-3 b: cdefg", new Part1Validator()).isValid()).toBeFalsy();
});

test('test invalid w/ Part1Validator: too few constraints', () => {
    expect(DBEntry.fromDbString("2-3 b: cdefgb", new Part1Validator()).isValid()).toBeFalsy();
});

test('test invalid w/ Part1Validator: too many constraints', () => {
    expect(DBEntry.fromDbString("1-3 b: cbdbbefgb", new Part1Validator()).isValid()).toBeFalsy();
});

test('test isValid w/ Part2Validator: valid', () => {
    expect(DBEntry.fromDbString("1-3 a: abcde", new Part2Validator()).isValid()).toBeTruthy();
});

test('test invalid w/ Part2Validator: does not contain constraint', () => {
    expect(DBEntry.fromDbString("1-3 b: cdefg", new Part2Validator()).isValid()).toBeFalsy();
});

test('test invalid w/ Part2Validator: too many constraints', () => {
    expect(DBEntry.fromDbString("2-9 c: ccccccccc", new Part2Validator()).isValid()).toBeFalsy();
});

test('test getValidCountPart1 with test input', () => {
    return getValidCountPart1('./input/day2_test.txt').then(value => expect(value).toBe(2));
})

test('test getValidCountPart1 with real input', () => {
    return getValidCountPart1('./input/day2_input.txt').then(value => {
        console.log("Answer Part 1: " + value);
    });
})

test('test getValidCountPart2 with test input', () => {
    return getValidCountPart2('./input/day2_test.txt').then(value => expect(value).toBe(1));
})

test('test getValidCountPart2 with real input', () => {
    return getValidCountPart2('./input/day2_input.txt').then(value => {
        console.log("Answer Part 2: " + value);
    });
})