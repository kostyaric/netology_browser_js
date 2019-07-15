'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('dblclick', init);
canvas.addEventListener('mousedown', toggle);
canvas.addEventListener('mouseup', toggle);
canvas.addEventListener('mouseleave', () => drawMode = false);
canvas.addEventListener('mousemove', draw);

window.addEventListener('resize', init);

let drawMode = false;
let updateCanvas = false;
let points = [];
let incSize = 1;
let incHue = true;
let brushSize = 100;
let hue = 5;

function init() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = [];

}

function draw(event) {
  
  if (drawMode) {
    incHue = event.shiftKey;
    const point = {
      coords: [event.offsetX, event.offsetY],
      brushSize: brushSize,
      hue: hue
    };
    points.push(point);
    updateCanvas = true;
  }

}

function update() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  let prevPoint = points[0];
  ctx.moveTo(...prevPoint.coords);
  for (const point of points) {
    if (prevPoint.lineEnd) {
      ctx.moveTo(...point.coords);
    }
    else {
      ctx.beginPath();
      ctx.lineWidth = point.brushSize;
      ctx.strokeStyle = `hsl(${point.hue}, 100%, 50%)`;
      ctx.quadraticCurveTo(...prevPoint.coords, ...point.coords);
      ctx.stroke();
    }
    prevPoint = point;
  }

}

function tick() {
  
  if (brushSize <= 5) {
	incSize = 1;
  }
  else if (brushSize >= 100) {
	incSize = -1;
  }

  brushSize += incSize;

  if (hue > 359) hue = 0;

  incHue ? hue++ : hue--;

  if (updateCanvas) {
    update();
    updateCanvas = false;
  }

  window.requestAnimationFrame(tick);

}

function toggle() {
  
  drawMode = (event.type === 'mousedown');
  if (event.type === 'mouseup') points[points.length - 1].lineEnd = true;

}

init();
tick();