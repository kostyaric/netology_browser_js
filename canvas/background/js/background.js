'use strict';

const canvas = document.querySelector(`#wall`);
const ctx = canvas.getContext(`2d`);
const crosses = [];
const rounds = [];


class MovingObject {
  constructor(ctx, pos, timeFunction) {
    this._ctx = ctx;
    this._startPos = {
      x: pos.x,
      y: pos.y
    };
    this._pos = pos;
    this._size = this.randomSize;
    this._lineWidth = this.size * 5;
    this.timeFunction = timeFunction;
  }
  
  pos(x = this._pos.x, y = this._pos.y) {
    this._pos.x = x;
    this._pos.y = y;
    return this._pos;
  }
  
  draw() {
    const ctx = this.ctx;
  }
  
  update() {
    const newPos = this.timeFunction(this.startPos.x, this.startPos.y, Date.now());
    this.pos(newPos.x, newPos.y);
    this.draw();
  }
  
  get startPos() {
    return this._startPos;}
  
  get ctx() {
    return this._ctx;}
  
  get size() {
    return this._size;}
  
  get randomSize() {
    return Math.random() * 0.5 + 0.1;}
  
  get lineWidth() {
    return this._lineWidth;}
  
  get color() {
    return `#fff`;
  }
}

class Cross extends MovingObject {
  constructor(ctx, pos, timeFunction) {
    super(ctx, pos, timeFunction);
    this.spinSpeed = getRandomInRange(-0.2, 0.2);
    this.angle = getRandomInRange(0, 360);
  }
  
  draw() {
    super.draw();
    const pos = super.pos();
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.translate(-pos.x, -pos.y);
    ctx.moveTo(pos.x + 10 * super.size, pos.y + 10 * super.size);
    ctx.lineTo(pos.x - 10 * super.size, pos.y - 10 * super.size);
    ctx.moveTo(pos.x + 10 * super.size, pos.y - 10 * super.size);
    ctx.lineTo(pos.x - 10 * super.size, pos.y + 10 * super.size);
    ctx.lineWidth = super.lineWidth;
    ctx.restore();
    ctx.stroke();
    
    this.spin();
  }
  
  spin() {
    this.angle += this.spinSpeed;
    if (this.angle < 0) {
      this.angle = 360;
    }
    else if (this.angle > 360) {
      this.angle = 0;
    }
  }
}

class Round extends MovingObject {
  constructor(ctx, pos, timeFunction) {
    super(ctx, pos, timeFunction);
  }
  
  draw() {
    super.draw();
    const pos = super.pos();
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, super.size * 12, 0, 2 * Math.PI);
    ctx.lineWidth = super.lineWidth;
    ctx.strokeStyle = super.color;
    ctx.stroke();
  }
}

init();
startAnimation(20);

function startAnimation(fps) {
  const mainLoop = setInterval(onFrameChange, 1000 / fps);
  
  function onFrameChange() {
    clearCanvas();
    const length = crosses.length;
    for (let i = 0; i < length; i++) {
      crosses[i].update();
      rounds[i].update();
    }
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const numberOfObjects = getRandomInRange(50, 200);
  
  for (let i = 0; i < numberOfObjects; i++) {
    crosses.push(new Cross(ctx, getRandomPos(), getRandomTimeFunction()));
    rounds.push(new Round(ctx, getRandomPos(), getRandomTimeFunction()));
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomPos() {
  return {
    x: getRandomInRange(0, canvas.width),
    y: getRandomInRange(0, canvas.height)
  }
}

function getRandomTimeFunction() {
  return Math.round() % 2 === 0 ? nextPointFirst : nextPointSecond;
  
  function nextPointFirst(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  }

  function nextPointSecond(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
}
