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

function circle(x, y, r, c) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = c;
    ctx.stroke();
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

var _w = 0;
var _theta = 1.57;
var GRAV = 9.8;
var _armLen = 100;
var _m = 1.5;
var _fric = 0.008;

function pendulum(mod) {


    _dt = mod;

    //wa is the angular acceleration
    //_w is our angular velocity
    //_theta is our current angle
    //equaton:
    //θ' = ω
    //ω' = − (g⁄R) * sin( θ )
    var wa = _dt * _m * (GRAV / _armLen) * Math.sin(_theta);
    _w += wa;
    _theta += _w;

    if (_theta > Math.PI * 2)
        _theta = _theta - Math.PI * 2;

    if (_theta < -Math.PI * 2)
        _theta = _theta + Math.PI * 2;
        
    _theta *= (1 - _fric);

    var theta = _theta - Math.PI / 2;
   
    //NOTE: theta of 0 is relative to the tippity top in our equation...
    //so subtract 90 degrees to match flashes rotation
    //var theta = _theta - Math.PI / 2;

    var ix = canvas.width / 2 + Math.cos(theta) * _armLen;
    var iy = canvas.height / 2 + Math.sin(theta) * _armLen;


    circle(ix, iy, 20, 'magenta');
    line({ x: ix, y: iy }, { x: canvas.width / 2, y: canvas.height / 2 }, 'magenta');

    ctx.font = "12px Georgia";
    ctx.fillStyle = '#000';
    ctx.fillText("_dt= " + _dt, 10, 10);
    ctx.fillText("wa (angular acceleration) = " + wa, 10, 26);
    ctx.fillText("_w (angular velocity) = " + _w, 10, 42);
    ctx.fillText("_theta= " + _theta, 10, 58);
    ctx.fillText("theta= " + theta, 10, 74);

    ctx.fillText(Math.round(ix) + " " + Math.round(iy), 10, 90);
}

function update(mod) {
 
    rect(0, 0, canvas.width, canvas.height, '#eee');

    pendulum(mod);


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

setInterval(run, 20);


















