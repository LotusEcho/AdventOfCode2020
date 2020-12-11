import * as fs from "fs/promises";
import {PathLike} from "fs";

async function readInputToList(filePath: PathLike): Promise<any[]> {
    let contentsBuffer: Buffer = await fs.readFile(filePath);
    return Promise.resolve(contentsBuffer.toString().split('\n'));
};

export {readInputToList}