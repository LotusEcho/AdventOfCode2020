
class BoardingPass {
    ticketId: string;
    row: number;
    column: number;
    seatId: number;

    constructor(ticketId: string) {
        this.ticketId = ticketId;
        this.computeLocation()
    }

    private computeLocation() {
        this.row = this.binarySearch(this.ticketId.substr(0, 7), 127, 0);
        this.column = this.binarySearch(this.ticketId.substr(7, 10), 7, 0)
        this.seatId = this.row * 8 + this.column;

    }
    private binarySearch(encodedValue: string, high: number, low: number): number {
        let mid = Math.floor((low + high) / 2);
        let currentCharacter = encodedValue.charAt(0);
        switch (currentCharacter) {
            case "F":
            case "L":
                if (encodedValue.length === 1) {
                    return low;
                }
                high = mid;
                break;
            case "B":
            case "R":
                if (encodedValue.length === 1) {
                    return high;
                }
                low = mid+1;
                break
            default:
                throw new Error("Oh no, that's not a character I expected. UwU: " + currentCharacter);
        }
        return this.binarySearch(encodedValue.substr(1, encodedValue.length-1), high, low)
    }
}

export {BoardingPass}