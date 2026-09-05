/* eslint-disable @typescript-eslint/no-unused-expressions */
function Oscillator(options) {
  this.init(options || {});
}

Oscillator.prototype = {
  init: function (options) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.val = 0;
  },
  update: function () {
    this.phase += this.frequency;
    this.val = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.val;
  },
  value: function () {
    return this.val;
  },
};

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

let ctx = null;
let f = null;
let pos = { x: 0, y: 0 };
let lines = [];
let animFrameId = null;
let isRunning = false;
let listenersAttached = false;

const E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

function Line(options) {
  this.init(options || {});
}

Line.prototype = {
  init: function (options) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      const t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  },
  update: function () {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (let i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  },
  draw: function () {
    if (!ctx) return;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    let a = 1;
    const o = this.nodes.length - 2;
    for (a = 1; a < o; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    const e = this.nodes[a];
    const t = this.nodes[a + 1];
    if (e && t) {
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    }
    ctx.stroke();
    ctx.closePath();
  },
};

function initLines() {
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
}

function updatePos(e) {
  if (e.touches && e.touches.length > 0) {
    pos.x = e.touches[0].clientX || e.touches[0].pageX;
    pos.y = e.touches[0].clientY || e.touches[0].pageY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
}

function onFirstInteraction(e) {
  updatePos(e);
  initLines();
  document.removeEventListener('mousemove', onFirstInteraction);
  document.removeEventListener('touchstart', onFirstInteraction);
  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('touchmove', onPointerMove, { passive: true });
  document.addEventListener('touchstart', onTouchMove, { passive: true });
}

function onPointerMove(e) {
  updatePos(e);
}

function onTouchMove(e) {
  if (e.touches && e.touches.length === 1) {
    updatePos(e);
  }
}

function render() {
  if (!isRunning || !ctx) return;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  if (f) {
    ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,50%,0.25)';
  }
  ctx.lineWidth = 1;
  for (let i = 0; i < E.trails; i++) {
    if (lines[i]) {
      lines[i].update();
      lines[i].draw();
    }
  }
  animFrameId = window.requestAnimationFrame(render);
}

function resizeCanvas() {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}

export function startCanvas(canvasElement) {
  if (typeof window === 'undefined') return;
  const canvas = canvasElement || document.getElementById('canvas');
  if (!canvas) return;

  ctx = canvas.getContext('2d');
  if (!ctx) return;

  isRunning = true;
  resizeCanvas();

  if (!f) {
    f = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
  }

  if (lines.length === 0) {
    pos.x = window.innerWidth / 2;
    pos.y = window.innerHeight / 2;
    initLines();
  }

  if (!listenersAttached) {
    document.addEventListener('mousemove', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    listenersAttached = true;
  }

  if (animFrameId) {
    window.cancelAnimationFrame(animFrameId);
  }
  animFrameId = window.requestAnimationFrame(render);
}

export function stopCanvas() {
  isRunning = false;
  if (animFrameId) {
    window.cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  if (ctx && ctx.canvas) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  if (listenersAttached) {
    document.removeEventListener('mousemove', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchstart', onTouchMove);
    window.removeEventListener('resize', resizeCanvas);
    listenersAttached = false;
  }
}

export const renderCanvas = startCanvas;