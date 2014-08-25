var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

/*****************************************
 * Data
 */

var l1 = {
    x1: 330,
    y1: 100,
    x2: 370,
    y2: 530
};

var mySprite = {
    x: 200,
    y: 200,
    width: 10,
    height: 10,
    color: '#c00'
};


/*****************************************
 * Math
 */

function dirline(p1, p2, r) {
    var dx = p2.x - p1.x,
        dy = p2.y - p1.y;

    var theta = Math.atan2(dy, dx);

    return {
        tx: x1 + Math.cos(theta) * r,
        ty: y1 + Math.sin(theta) * r
    };
}

function intersection(p1, p2, p3, p4)
{   
    var x4_x3 = p4.x - p3.x;
    var y4_y3 = p4.y - p3.y;
    var x2_x1 = p2.x - p1.x;
    var y2_y1 = p2.y - p1.y;
    var x1_x3 = p1.x - p3.x;
    var y1_y3 = p1.y - p3.y;
   
    var nx = x4_x3 * y1_y3 - y4_y3 * x1_x3;
    var ny = x2_x1 * y1_y3 - y2_y1 * x1_x3;
    var dn = y4_y3 * x2_x1 - x4_x3 * y2_y1;
   
    nx /= dn;
    ny /= dn;
   
    // has intersection
    if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {

        ny = p1.y + nx * y2_y1;
        nx = p1.x + nx * x2_x1;

        return {
            m: true,
            x: nx,
            y: ny
        }

    }else{
        // no intersection
        return {
            m: false,
            x: 0,
            y: 0
        }
    }

    return ip
}

/*****************************************
 * Draw
 */

function line(p1, p2, c) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = c;
    ctx.stroke();
}

function rect(x,y,w,h,c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}

/*****************************************
 * Input
 */

function getPosition(event) {
    var x = 0,
        y = 0;

    x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    click(x, y);
}

function click(x, y) {


}

/*****************************************
* Run
*/

function update(mod) {
    
}

function render() {
    
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
}

canvas.addEventListener("mousedown", getPosition);

var time = Date.now();

setInterval(run, 10);


















