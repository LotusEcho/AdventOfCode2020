import {part1, processTwo} from "../lib/day1/part1"
import {part2, processThree} from "../lib/day1/part2";

test('part1 test input', () => {
    return part1("./input/day1_test.txt").then(value => expect(value)
        .toBe(514579)).catch(reason => console.log(reason));
});

test('part1 processTwo number test', () => {
     expect(processTwo(["1721", "979", "366", "299", "675" ,"1456"]))
         .toBe(514579);
});

test('part1 answer test', () => {
   return part1("./input/day1_input.txt").then(answer =>
   {
       console.log(answer);
       expect(answer).toBeGreaterThan(-1);
   });
});

test('part2 test input', () => {
    return part2("./input/day1_test.txt").then(value => expect(value)
        .toBe(241861950)).catch(reason => console.log(reason));
});

test('part2 processThree number test', () => {
    expect(processThree(["1721", "979", "366", "299", "675" ,"1456"]))
        .toBe(241861950);
});

test('part2 answer test', () => {
    return part2("./input/day1_input.txt").then(answer =>
    {
        console.log(answer);
        expect(answer).toBeGreaterThan(-1);
    });
});