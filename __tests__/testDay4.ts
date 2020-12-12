import {readInputToList} from "../lib/common/readfile";
import {Passport, separatePassports} from "../lib/day4/day4";

test('test part1 createPassport valid', () => {
    let validPassport = ["ecl:gry pid:860033327 eyr:2020 hcl:#fffffd", "byr:1937 iyr:2017 cid:147 hgt:183cm"];
    let passport = new Passport(validPassport);
    expect(passport.isValidSimple()).toBeTruthy();
    expect(passport.eye_color).toBe("gry");
    expect(passport.passport_id).toBe("860033327");
    expect(passport.expiration_year).toBe(2020);
    expect(passport.hair_color).toBe("#fffffd");
    expect(passport.birth_year).toBe(1937);
    expect(passport.issue_year).toBe(2017);
    expect(passport.country_id).toBe(147);
    expect(passport.height).toBe("183cm");
});

test('test part1 createPassport invalid', () => {
    let invalidPassport = ["hcl:#cfa07d eyr:2025 pid:166559648", "iyr:2011 ecl:brn hgt:59in"];
    let passport = new Passport(invalidPassport);
    expect(passport.isValidSimple()).toBeFalsy();
    expect(passport.eye_color).toBe("brn");
    expect(passport.passport_id).toBe("166559648");
    expect(passport.expiration_year).toBe(2025);
    expect(passport.hair_color).toBe("#cfa07d");
    expect(passport.issue_year).toBe(2011);
    expect(passport.height).toBe("59in");
});

test('test separate passports from file part 1', () => {
    return readInputToList('./input/day4_test.txt').then(lineEntries => {
       let passports = separatePassports(lineEntries);
       expect(passports.length).toBe(4);
       expect(passports[0].country_id).toBe(147);
       expect(passports[2].passport_id).toBe("760753108")
        expect(passports.filter(value => value.isValidSimple()).length)
            .toBe(2);
    });
});

test('test get passports from file part 2', () => {
    return readInputToList('./input/day4_test2.txt').then(lineEntries => {
        let passports = separatePassports(lineEntries);
        expect(passports.length).toBe(8);
        expect(passports.filter(value => value.isValid()).length)
            .toBe(4);
    });
});

test('test get number of valid passport from file part 1', () => {
    return readInputToList('./input/day4_input.txt').then(lineEntries => {
        let passports = separatePassports(lineEntries);
        console.log("Valid passports part 1: " + passports.filter(passport => passport.isValidSimple()).length);
    });
});

test('test get number of valid passport from file part 2', () => {
    return readInputToList('./input/day4_input.txt').then(lineEntries => {
        let passports = separatePassports(lineEntries);
        console.log("Valid passports part 2: " + passports.filter(passport => passport.isValid()).length);
    });
});