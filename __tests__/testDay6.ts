import {CustomsAnswers, CustomsForm, readGroups} from "../lib/day6/day6";
import {readInputToList} from "../lib/common/readfile";

test('test CustomsAnswers has correct answers', () => {
   let customsAnswers = new CustomsAnswers("abc");
   let expected = new Set(["a", "b", "c"]);
   expect(customsAnswers.answers).toMatchObject(expected);
});

test('test CustomsForm has correct group answers', () => {
    let customsForm = new CustomsForm();
    customsForm.addAnswersToGroup(new CustomsAnswers("abc"));
    customsForm.addAnswersToGroup(new CustomsAnswers("ac"))
    customsForm.addAnswersToGroup(new CustomsAnswers("ad"));
    let expectedMap = new Map<string, number>();
    expectedMap.set("a", 3);
    expectedMap.set("b", 1);
    expectedMap.set("c", 2);
    expectedMap.set("d", 1);
    expect(customsForm.groupAnswers).toMatchObject(expectedMap);
    expect(customsForm.getCount()).toBe(4);
    expect(customsForm.getAllYesCount()).toBe(1);
});

test('test load test input and validate results', () => {
    return readGroups('./input/day6_test.txt').then(customsForms => {

        expect(customsForms.length).toBe(5);
        expect(customsForms[0].getCount()).toBe(3);
        expect(customsForms[1].getCount()).toBe(3);
        expect(customsForms[2].getCount()).toBe(3);
        expect(customsForms[3].getCount()).toBe(1);
        expect(customsForms[4].getCount()).toBe(1);
        let part1Answer = customsForms.map(value => value.getCount())
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        let part2Answer = customsForms.map(value => value.getAllYesCount())
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        expect(part1Answer).toBe(11);
        expect(part2Answer).toBe(6);
    });
});

test('test load real input part 1 and validate results', () => {
    return readGroups('./input/day6_input.txt').then(customsForms => {

        expect(customsForms.length).toBeGreaterThan(5);
        let part1Answer = customsForms.map(value => value.getCount())
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        console.log(`Part 1 answer: ${part1Answer}`);
    });
});

test('test load real input part 2 and validate results', () => {
    return readGroups('./input/day6_input.txt').then(customsForms => {

        expect(customsForms.length).toBeGreaterThan(5);
        let part2Answer = customsForms.map(value => value.getAllYesCount())
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        console.log(`Part 2 answer: ${part2Answer}`);
    });
});