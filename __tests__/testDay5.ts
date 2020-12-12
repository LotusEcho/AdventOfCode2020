import {BoardingPass} from "../lib/day5/day5";
import {readInputToList} from "../lib/common/readfile";

test('test parse boarding pass 0 part 1', () => {
    let boardingPass = new BoardingPass("FBFBBFFRLR");
    expect(boardingPass.ticketId).toBe("FBFBBFFRLR")
    expect(boardingPass.row).toBe(44);
    expect(boardingPass.column).toBe(5);
    expect(boardingPass.seatId).toBe(357);
});

test('test parse boarding pass 1 part 1', () => {
    let boardingPass = new BoardingPass("BFFFBBFRRR");
    expect(boardingPass.ticketId).toBe("BFFFBBFRRR")
    expect(boardingPass.row).toBe(70);
    expect(boardingPass.column).toBe(7);
    expect(boardingPass.seatId).toBe(567);
});

test('test parse boarding pass 2 part 1', () => {
    let boardingPass = new BoardingPass("FFFBBBFRRR");
    expect(boardingPass.ticketId).toBe("FFFBBBFRRR")
    expect(boardingPass.row).toBe(14);
    expect(boardingPass.column).toBe(7);
    expect(boardingPass.seatId).toBe(119);
});

test('test parse boarding pass 3 part 1', () => {
    let boardingPass = new BoardingPass("BBFFBBFRLL");
    expect(boardingPass.ticketId).toBe("BBFFBBFRLL")
    expect(boardingPass.row).toBe(102);
    expect(boardingPass.column).toBe(4);
    expect(boardingPass.seatId).toBe(820);
});

test('sanity check part 1 read file', () => {
    return readInputToList('./input/day5_input.txt').then(boardingStrings => {
        console.log("Part 1 answer: " + boardingStrings.map(boardingString => new BoardingPass(boardingString))
            .reduce((previousValue, currentValue) =>
                previousValue.seatId >= currentValue.seatId ? previousValue : currentValue).seatId);
    });
});

test('find seat part 2', () => {
    return readInputToList('./input/day5_input.txt').then(boardingStrings => {
        let boardingMap = new Map();
        boardingStrings.forEach(boardingString => {
            let boardingPass = new BoardingPass(boardingString);
            boardingMap.set(boardingPass.seatId, boardingPass);
        });
        for (let index = 0; index < 1024; index++) {
            if (index > 0 && !boardingMap.has(index) && boardingMap.has(index - 1) && boardingMap.has(index + 1)) {
                console.log("Part 2 answer: " + index);
            }
        }
    });
});

test('find seat part 2 but faster because lookup by index I guess', () => {
    return readInputToList('./input/day5_input.txt').then(boardingStrings => {

        let allBoardingPasses = [];
        for (let index = 0; index < 1024; index++) {
            allBoardingPasses.push(false);
        }
        boardingStrings.forEach(boardingString => {
            let boardingPass = new BoardingPass(boardingString);
            allBoardingPasses[boardingPass.seatId] = boardingPass;
        });
        for (let index = 0; index < 1024; index++) {
            if (index > 0 && !allBoardingPasses[index] && allBoardingPasses[index - 1] && allBoardingPasses[index + 1]) {
                console.log("Part 2 answer: " + index);
            }
        }
    });
});
