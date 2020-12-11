
class MapRow {
    rowString: string;

    getHorizontalIndexFromCoordinates(sled: Sled): number {
        if (sled.x < 0) {
            return this.rowString.length - (sled.x % this.rowString.length)
        } else {
            return sled.x % this.rowString.length;
        }
    }

    detectCollision(sled: Sled): boolean {
        return this.rowString.charAt(this.getHorizontalIndexFromCoordinates(sled)) === '#';
    }

    constructor(rowString: string) {
        this.rowString = rowString;
    }
}

class Sled {
    x_slope: number;
    y_slope: number;
    x: number;
    y: number;
    collision_count: number;

    static partOneSled() {
        return new Sled(3, 1);
    }

    constructor (x_slope: number, y_slope: number) {
        this.x_slope = x_slope;
        this.y_slope = y_slope;
        this.x = 0;
        this.y = 0;
        this.collision_count = 0;
    }

    move() {
        this.x = this.x + this.x_slope;
        this.y = this.y + this.y_slope;
    }
}


function detectCollision(sled: Sled, map: MapRow[]): boolean {
    return map[sled.y].detectCollision(sled);
}

function doPathing(sleds: Sled[], map: MapRow[]): number {
    sleds.forEach(sled => {
        while(sled.y < map.length) {
            if (map[sled.y].detectCollision(sled)) {
                sled.collision_count++;
            }
            sled.move();
        }
    });
    return sleds.map(value => value.collision_count).reduce((previousValue, currentValue) => previousValue * currentValue);
}

export {detectCollision, MapRow, Sled, doPathing}