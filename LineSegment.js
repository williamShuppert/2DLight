import Point from "./Point.js";
import Line from "./Line.js";

class Lineseg extends Line {

    constructor(sp, ep) {
        super(sp,ep);
    }
  
    findDistance() {
        return Math.sqrt(Math.pow(this.ep.x-this.sp.x,2)+Math.pow(this.ep.y-this.sp.y,2))
    }
    
    findIntersection(lineseg) {
        let s1_x, s1_y, s2_x, s2_y;
        s1_x = this.ep.x - this.sp.x;     s1_y = this.ep.y - this.sp.y;
        s2_x = lineseg.ep.x - lineseg.sp.x;     s2_y = lineseg.ep.y - lineseg.sp.y;
    
        let s, t;
        s = (-s1_y * (this.sp.x - lineseg.sp.x) + s1_x * (this.sp.y - lineseg.sp.y)) / (-s2_x * s1_y + s1_x * s2_y);
        t = ( s2_x * (this.sp.y - lineseg.sp.y) - s2_y * (this.sp.x - lineseg.sp.x)) / (-s2_x * s1_y + s1_x * s2_y);
    
        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) return new Point(this.sp.x + (t * s1_x), this.sp.y + (t * s1_y));
        return null; // No collision
    }
}

export default Lineseg;