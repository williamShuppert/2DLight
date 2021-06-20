import Line from "./Line.js";
import Lineseg from "./LineSegment.js";
import Point from "./Point.js";

Math.degToRad = Math.PI / 180;
Math.radToDeg = 180 / Math.PI;

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

canvas.resize = () => {
    var dpr = window.devicePixelRatio;
    var parent = canvas.parentElement;
    canvas.width = parent.offsetWidth * dpr;
    canvas.height = parent.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
};

canvas.resize();

var lines = [
    new Lineseg(new Point(400,400), new Point(200,400)),
    new Lineseg(new Point(200,400), new Point(200,200)),
    new Lineseg(new Point(200,200), new Point(400,200)),
    new Lineseg(new Point(400,200), new Point(400,400)),
]

var border = [
    new Point(0,0),
    new Point(canvas.width, 0),
    new Point(canvas.width, canvas.height),
    new Point(0, canvas.height),
]

var box = [
    new Point(400,400),
    new Point(200,400),
    new Point(200,200),
    new Point(400,200),
]

var tri = [
    new Point(600,600),
    new Point(700,800),
    new Point(500,800),
]

var objects = [
    box,
    tri,
    border,
    [new Point(900,500), new Point(910, 500)],
    [new Point(920,500), new Point(930, 500)],
    [new Point(940,500), new Point(950, 500)],
    [new Point(960,500), new Point(970, 500)],
    [new Point()]
]

var mousePos = new Point();

window.onmousemove = (event) => {
    mousePos = new Point(event.x, event.y)
}

function draw() {
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    // draw objects
    // ctx.strokeStyle = 'red'
    // for (var obj of objects) {
    //     ctx.beginPath()
    //     for (var p of obj) {
    //         ctx.lineTo(p.x, p.y);
    //     }
    //     ctx.lineTo(obj[0].x,obj[0].y); // if obj should be closed, connect first to last point
    //     ctx.stroke();
    // }


    var lightShape = [];
    for (var obj of objects) {
        for (var p of obj) {
            for (var rayIndex = 0; rayIndex < 3; rayIndex++) {

                var rotatedPoint = p;
                var angle;

                if (rayIndex == 0) angle = .00001;
                else if (rayIndex == 1) angle = -.00001;

                if (angle != undefined) {
                    var tempPoint = p.sub(mousePos);
                    var sin = Math.sin(angle);
                    var cos = Math.cos(angle);
                    rotatedPoint = new Point(tempPoint.x * cos - tempPoint.y * sin, tempPoint.x * sin + tempPoint.y * cos);
                    rotatedPoint = rotatedPoint.mult(new Point(100)).add(mousePos);

                    // ctx.beginPath()
                    // ctx.lineTo(mousePos.x, mousePos.y);
                    // ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
                    // ctx.stroke();
                }

                var ray = new Lineseg(mousePos, rotatedPoint);
    
                var closestIntersect = null;
                for (var obj2 of objects) {
                    var intersect;
                    for (var i = 0; i < obj2.length ; i++) {
                        var indexOfNextPoint = i + 1;
                        if (i + 1 == obj2.length) indexOfNextPoint = 0;
                        intersect = ray.findIntersection(new Lineseg(obj2[i], obj2[indexOfNextPoint]));
                        if (intersect != null) {
                            if (closestIntersect == null) closestIntersect = intersect;
                            else if (intersect.distance(mousePos) < closestIntersect.distance(mousePos)) closestIntersect = intersect;
                        }
                    }
                }
    
                if (closestIntersect == null) continue; // I don't know if I need this, it seems to work without it
                lightShape.push(closestIntersect);
    
                // draw closest intersect and line to it from mouse
                // ctx.beginPath();
                // ctx.moveTo(mousePos.x, mousePos.y);
                // ctx.lineTo(closestIntersect.x, closestIntersect.y);
                // ctx.stroke();
                // ctx.beginPath();
                // ctx.arc(closestIntersect.x, closestIntersect.y, 3, 0, Math.PI * 2);
                // ctx.fill();
    
                // draw lines to all points from mouse
                // ctx.beginPath()
                // ctx.lineTo(p.x, p.y);
                // ctx.lineTo(mousePos.x, mousePos.y);
                // ctx.stroke();
            }           
        }
    }

    // sort intersect points
    lightShape.sort((a,b) => {
        a = a.sub(mousePos);
        b = b.sub(mousePos);
        return Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x);
    })
  
    // fill in lightShape
    ctx.strokeStyle = 'rgb(100,100,100)';
    ctx.fillStyle = 'rgb(100,100,100)';
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow'
    for (var i = 0; i < lightShape.length; i++) {
        var indexOfNextPoint = i + 1;
        if (indexOfNextPoint == lightShape.length) indexOfNextPoint = 0;
        // ctx.fillStyle = `rgb(${i * 4},${i * 4},${i * 4})`
        ctx.beginPath();
        ctx.lineTo(lightShape[i].x, lightShape[i].y)
        ctx.lineTo(lightShape[indexOfNextPoint].x, lightShape[indexOfNextPoint].y)
        ctx.lineTo(mousePos.x, mousePos.y)
        ctx.stroke();
        ctx.fill()


    }
    
    // color walls
    ctx.beginPath();
    ctx.lineTo(lightShape[0].x, lightShape[0].y)
    for (var i = 0; i < lightShape.length; i++) {
        var indexOfNextPoint = i + 1;
        if (indexOfNextPoint == lightShape.length) indexOfNextPoint = 0;

        // don't draw outline if it's not a wall
        var point = lightShape[i].sub(mousePos);
        var point2 = lightShape[indexOfNextPoint].sub(mousePos);
        if (Math.abs(Math.atan2(point.y, point.x) - Math.atan2(point2.y, point2.x)) <= .00005) {
            ctx.moveTo(lightShape[indexOfNextPoint].x, lightShape[indexOfNextPoint].y);
            continue;
        }

        ctx.lineTo(lightShape[indexOfNextPoint].x, lightShape[indexOfNextPoint].y)
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5
    ctx.stroke();
    ctx.lineWidth = 1

    // draw numbers on sorted intersect points
    // ctx.fillStyle = 'red';
    // for (var i = 0; i < lightShape.length; i++) {
    //     ctx.beginPath();
    //     ctx.font = '20px monospace';
    //     ctx.fillText(i,lightShape[i].x,lightShape[i].y);
    //     ctx.stroke();
    // }
    requestAnimationFrame(draw);
}
draw();