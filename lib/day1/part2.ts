import {readInputToList} from "../common/readfile"
import {PathLike} from "fs";
function processThree(input: string[]): number {
    let expenseReports = input.map(value => parseInt(value));

    for (let index1 = 0; index1 < expenseReports.length; index1++) {
        if (index1+2 < expenseReports.length) {
            for (let index2 = index1 + 1; index2 < expenseReports.length; index2++) {
                if (index2 + 1 < expenseReports.length) {
                    for (let index3 = index2 + 1; index3 < expenseReports.length; index3++) {
                        if(expenseReports[index1] + expenseReports[index2] + expenseReports[index3] === 2020) {
                            return expenseReports[index1] * expenseReports[index2] * expenseReports[index3];
                        }
                    }
                }
            }
        }
    }
    return -1;
}

async function part2(filePath: PathLike): Promise<number> {
    return await readInputToList(filePath).then(value => processThree(value));
}

export {part2, processThree}