class DBEntry {
    lowerBound: number;
    upperBound: number;
    characterReq: string;
    password: string;
    private validator: Validator;

    isValid() : boolean {
        return this.validator.validate(this);
    }
    constructor(lowerBound: number, upperBound: number, characterReq: string, password: string, validator: Validator) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.characterReq = characterReq;
        this.password = password;
        this.validator = validator
    }

    static fromDbString(dbString: string, validator: Validator): DBEntry {
        let parts = dbString.split(" ");
        let bounds = parts[0].split("-");
        let lowerBound = parseInt(bounds[0]);
        let upperBound = parseInt(bounds[1]);
        let characterReq = parts[1].charAt(0);
        let password = parts[2];

        return new DBEntry(lowerBound, upperBound, characterReq, password, validator);
    }
}
abstract class Validator {
    abstract validate(entry: DBEntry): boolean;

}
class Part1Validator {

    validate(entry: DBEntry): boolean {
        if (entry.password.includes(entry.characterReq)){
            let count = 0;
            for (let index = 0; index < entry.password.length; index++) {
                if (entry.password.charAt(index) == entry.characterReq) {
                    count++;
                }
            }
            return count >= entry.lowerBound && count <= entry.upperBound;
        } else {
            return false;
        }
    }
}
class Part2Validator {

    validate(entry: DBEntry): boolean {
        if (entry.password.includes(entry.characterReq) &&
            entry.password.charAt(entry.lowerBound-1) !== entry.password.charAt(entry.upperBound-1)
            && (entry.password.charAt(entry.lowerBound-1) === entry.characterReq
            || entry.password.charAt(entry.upperBound-1) === entry.characterReq)){
            return true;
        } else {
            return false;
        }
    }
}
export{DBEntry, Part1Validator, Part2Validator, Validator}
