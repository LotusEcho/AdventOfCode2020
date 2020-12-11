import {readInputToList} from "../common/readfile"
import {PathLike} from "fs";

function processTwo(input: string[]): number {
    let expenseReports: number[] = [];
    let answer = -1;

    input.forEach(stringValue => {
        if (answer == -1) {
            let numberValue = parseInt(stringValue);
            expenseReports.forEach(expenseValue => {
                if (expenseValue + numberValue == 2020) {
                    answer = expenseValue * numberValue;
                }
            });
            expenseReports.push(numberValue);
        }
    });
    return answer;
}

async function part1(filePath: PathLike): Promise<number> {
    return await readInputToList(filePath).then(value => processTwo(value));
}

export {part1, processTwo}