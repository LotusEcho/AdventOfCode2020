
/*
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
 */

class Passport {
    birth_year: number;
    issue_year: number;
    expiration_year: number;
    height: string;
    hair_color: string;
    eye_color: string;
    passport_id: string;
    country_id: number;

    constructor(readerStrings: string[]) {
        readerStrings.forEach(readerString => {
            readerString.split(" ").forEach(readerPairs => {
                let pairValues = readerPairs.split(":");
                this.setRightField(pairValues[0], pairValues[1]);
            });
        });
    }

    isValidSimple() {
        return ( this.birth_year && this.issue_year && this.expiration_year && this.height && this.hair_color && this.eye_color && this.passport_id);
    }

    /*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
     */

    isValid() {
        if (this.isValidSimple() &&
            this.birth_year >= 1920 && this.birth_year <= 2002 //RIP children
            && this.issue_year >= 2010 && this.issue_year <= 2020
            && this.expiration_year >= 2020 && this.expiration_year <= 2030
            && this.hair_color.match(/^#[0-9a-f]{6}$/)
            && this.passport_id.match(/^[0-9]{9}$/)
            && this.eye_color.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) {
            let heightParse = /^(\d+)(cm|in)$/.exec(this.height);
            if (heightParse) {
                let numericHeight = parseInt(heightParse[1]);
                switch (heightParse[2]) { // Y THO?
                    case "cm":
                        return numericHeight >= 150 && numericHeight <= 193
                    case "in":
                        return numericHeight >= 59 && numericHeight <= 76;
                    default:
                        return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    private setRightField(fieldName: string, fieldValue: string) {
        if (fieldValue == undefined || fieldValue === "") {
            throw new Error("Oh no, bad value named " + fieldName)
        }
        switch (fieldName) {
            case "byr":
                this.birth_year = parseInt(fieldValue);
                break;
            case "iyr":
                this.issue_year = parseInt(fieldValue);
                break;
            case "eyr":
                this.expiration_year = parseInt(fieldValue);
                break;
            case "hgt":
                this.height = fieldValue;
                break;
            case "hcl":
                this.hair_color = fieldValue;
                break;
            case "ecl":
                this.eye_color = fieldValue;
                break;
            case "pid":
                this.passport_id = fieldValue;
                break;
            case "cid":
                this.country_id = parseInt(fieldValue);
                break;
            default:
                throw new Error("I don't recognize " + fieldName)
        }
    }
}

function separatePassports(entryList: string[]): Passport[] {
    let currentPassport = [];
    let passportList = [];
    entryList.forEach(entry => {
        if (entry !== "") {
            currentPassport.push(entry);
        } else {
            passportList.push(new Passport(currentPassport));
            currentPassport = [];
        }
    });
    passportList.push(new Passport(currentPassport));
    return passportList;
}

export {Passport, separatePassports}
