import {readInputToList} from "../common/readfile";
import {PathLike} from "fs";
import {DBEntry, Part1Validator, Part2Validator, Validator} from "./dbentry";


async function getValidCount(filePath: PathLike, validator: Validator): Promise<number> {
    return await readInputToList(filePath).then(dbStringList =>
        dbStringList.map(dbString =>
            DBEntry.fromDbString(dbString, validator)).filter(dbEntry =>
            dbEntry.isValid()).length);
}
async function getValidCountPart1(filePath: PathLike): Promise<number> {
    return await getValidCount(filePath, new Part1Validator());
}

async function getValidCountPart2(filePath: PathLike): Promise<number> {
    return await getValidCount(filePath, new Part2Validator());
}

export { getValidCountPart1, getValidCountPart2 }