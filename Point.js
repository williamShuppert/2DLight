class Point {
    constructor(x, y) {
        if (x === undefined && y === undefined) { // default
            this.x = 0;
            this.y = 0;
        } else if (x != undefined && y === undefined) {
            if (x instanceof Point) { // copy
                this.x = x.x;
                this.y = x.y;
            } else { // single digit
                this.x = x;
                this.y = x;
            }           
        } else if (x != undefined && y != undefined) { // double digit
            this.x = x;
            this.y = y;
        }
    }

    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

    sub(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    mult(point) {
        return new Point(this.x * point.x, this.y * point.y);
    }

    div(point) {
        return new Point(this.x / point.x, this.y / point.y);
    }

    distance(point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    }

    equals(point) {
        return (this.x == point.x && this.y == point.y);
    }

    floor() {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    ceil() {
        return new Point(Math.ceil(this.x), Math.ceil(this.y));
    }

    round(places) {
        if (places == undefined || places == 0) return new Point(Math.round(this.x), Math.round(this.y));
        var num = places * 10;
        return new Point(Math.round((this.x + Number.EPSILON) * num) / num,Math.round((this.y + Number.EPSILON) * num) / num);
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    evaluate(func) {
        return func(this.x, this.y);
    }
}

export default Point;