// asg0 — 2D vectors with Vector3 (z = 0)

var canvas;
var ctx;

function main() {
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  document.getElementById('drawVectorsBtn').onclick = handleDrawEvent;
  document.getElementById('drawOperationBtn').onclick = handleDrawOperationEvent;

  handleDrawEvent();
}

function readV1V2() {
  var x1 = parseFloat(document.getElementById('v1x').value);
  var y1 = parseFloat(document.getElementById('v1y').value);
  var x2 = parseFloat(document.getElementById('v2x').value);
  var y2 = parseFloat(document.getElementById('v2y').value);
  if (isNaN(x1)) x1 = 0;
  if (isNaN(y1)) y1 = 0;
  if (isNaN(x2)) x2 = 0;
  if (isNaN(y2)) y2 = 0;
  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);
  return { v1: v1, v2: v2 };
}

function drawVector(v, color) {
  var cx = canvas.width / 2;
  var cy = canvas.height / 2;
  var scale = 20;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v.elements[0] * scale, cy - v.elements[1] * scale);
  ctx.stroke();
}

function handleDrawEvent() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var pair = readV1V2();
  drawVector(pair.v1, 'red');
  drawVector(pair.v2, 'blue');
}

function handleDrawOperationEvent() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var pair = readV1V2();
  var v1 = pair.v1;
  var v2 = pair.v2;

  drawVector(v1, 'red');
  drawVector(v2, 'blue');

  var op = document.getElementById('operation').value;
  var s = parseFloat(document.getElementById('scalar').value);
  if (isNaN(s)) s = 0;

  if (op === 'add') {
    var v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(v3, 'green');
  } else if (op === 'sub') {
    var v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(v3, 'green');
  } else if (op === 'mul') {
    var v3 = new Vector3(v1.elements);
    var v4 = new Vector3(v2.elements);
    v3.mul(s);
    v4.mul(s);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (op === 'div') {
    var v3 = new Vector3(v1.elements);
    var v4 = new Vector3(v2.elements);
    v3.div(s);
    v4.div(s);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (op === 'magnitude') {
    console.log('Magnitude v1:', v1.magnitude());
    console.log('Magnitude v2:', v2.magnitude());
  } else if (op === 'normalize') {
    var vn1 = new Vector3(v1.elements);
    var vn2 = new Vector3(v2.elements);
    vn1.normalize();
    vn2.normalize();
    drawVector(vn1, 'green');
    drawVector(vn2, 'green');
  } else if (op === 'angle') {
    var alpha = angleBetween(v1, v2);
    console.log('Angle between v1 and v2 (radians):', alpha);
  } else if (op === 'area') {
    var A = areaTriangle(v1, v2);
    console.log('Area of triangle (v1, v2):', A);
  }
}

function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var m1 = v1.magnitude();
  var m2 = v2.magnitude();
  if (m1 === 0 || m2 === 0) {
    return NaN;
  }
  var c = dot / (m1 * m2);
  if (c > 1) c = 1;
  if (c < -1) c = -1;
  return Math.acos(c);
}

function areaTriangle(v1, v2) {
  var c = Vector3.cross(v1, v2);
  return 0.5 * c.magnitude();
}
