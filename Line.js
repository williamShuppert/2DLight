import Point from "./Point.js";

class Line {

    ep; sp; // start point and end point

    constructor(sp, ep) {
        if (sp && ep) {
            this.sp = sp;
            this.ep = ep;
        } else {
            this.sp = new Point();
            this.ep = new Point();
        }
    }

    findIntersection(line) {  
        let p0 = this.ep, p1 = this.sp
        let p2 = line.ep, p3 = line.sp
        let A1 = p1.y - p0.y,
            B1 = p0.x - p1.x,
            C1 = A1 * p0.x + B1 * p0.y,
            A2 = p3.y - p2.y,
            B2 = p2.x - p3.x,
            C2 = A2 * p2.x + B2 * p2.y,
            denominator = A1 * B2 - A2 * B1

        return new Point(B2*C1-B1*C2,A1*C2-A2*C1).divide(denominator)
    }

    static findIntersection(line1, line2) {
        let p0 = line1.ep, p1 = line1.sp
        let p2 = line2.ep, p3 = line2.sp
        let A1 = p1.y - p0.y,
            B1 = p0.x - p1.x,
            C1 = A1 * p0.x + B1 * p0.y,
            A2 = p3.y - p2.y,
            B2 = p2.x - p3.x,
            C2 = A2 * p2.x + B2 * p2.y,
            denominator = A1 * B2 - A2 * B1

        return new Point(B2*C1-B1*C2,A1*C2-A2*C1).divide(denominator)
    }
}

export default Line;