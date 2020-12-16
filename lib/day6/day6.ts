import exp from "constants";
import {readInputToList} from "../common/readfile";

class CustomsAnswers {
    answers: Set<string>;

    constructor(inputString: string) {
        this.answers = new Set();
        for (let index = 0; index < inputString.length; index++) {
            this.answers.add(inputString.charAt(index));
        }
    }
}

class CustomsForm {
    groupAnswers: Map<string, number>;
    participants: number;

    constructor() {
        this.groupAnswers = new Map<string, number>();
        this.participants = 0;
    }

    addAnswersToGroup(answers: CustomsAnswers) {
        answers.answers.forEach(answer => {
            if (this.groupAnswers.has(answer)) {
                this.groupAnswers.set(answer, this.groupAnswers.get(answer) +1);
            } else {
                this.groupAnswers.set(answer, 1);
            }
        });
        this.participants++;
    }

    getCount() {
        return this.groupAnswers.size;
    }

    getAllYesCount() {
        let count = 0;
        this.groupAnswers.forEach(value => {
            if (value === this.participants) {
                count++;
            }
        });
        return count;
    }
}

async function readGroups(filePath: string): Promise<CustomsForm[]> {
    let customsForms = new Array();
    let inputStrings = await readInputToList(filePath);
    let currentCustomsForm = new CustomsForm();

    inputStrings.forEach(inputString => {
        if (inputString) {
            currentCustomsForm.addAnswersToGroup(new CustomsAnswers(inputString));
        } else {
            customsForms.push(currentCustomsForm);
            currentCustomsForm = new CustomsForm();
        }
    });
    customsForms.push(currentCustomsForm);
    return customsForms;
}

export{CustomsAnswers, CustomsForm, readGroups}