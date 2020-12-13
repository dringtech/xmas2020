import Hills from './components/Hills'
import Star from './components/Star';
import Moon from './components/Moon';
import starMap from './utils/starMap';
import p5 from './utils/p5';
import Globe from './components/Globe';
const { color, createCanvas, smooth, createGraphics, image, resizeCanvas, createButton } = p5;

const hillOpts = () => [
  {
    range: 50,
    base: p5.height * 0.7,
    top: p5.height * 0.4,
    scale: 0.02,
    fill: color('hsl(260,40%,70%)'),
    stroke: color(20, 150),
  },
  {
    range: 100,
    base: p5.height * 0.3,
    top: p5.height * 0.6,
    scale: 0.01,
    fill: color('hsl(260,40%,75%)'),
    stroke: color(20, 150),
  },
  {
    range: 100,
    base: p5.height * 0.2,
    fill: color('hsl(260,30%,90%)'),
    stroke: color(20, 150),
  },
];
let bg;
let hills;
let stars;
let moon;
let globe;
let button;
let shakeTimer = 0;

export function setup({ windowWidth, windowHeight }) {
  createCanvas(windowWidth, windowHeight);
  hills = hillOpts().map((o) => new Hills({ ...o }));
  smooth();
  buildBackground();
  generateStarfield();
  moon = new Moon({ x: 100, y: 100 });
  globe = new Globe();
  button = createButton('Shake the Drings!');
  button.mousePressed(shakeGlobe);
}

function buildBackground() {
  bg = createGraphics(p5.width, p5.height);
  bg.background(color('hsb(240, 80%, 20%)'));
}

function generateStarfield() {
  const cols = Math.floor(p5.width / 200);
  const rows = Math.floor(p5.height / 50);

  const starMapper = starMap(cols, rows);
  const numStars = Math.ceil((cols * rows) / 2);
  stars = Array.from(Array(numStars)).map(
    () =>
      new Star({
        ...starMapper.next().value,
        width: 1,
        height: 2,
      })
  );
}

export function draw() {
  image(bg, 0, 0);
  stars.forEach(s => s.draw());
  moon.draw();
  hills.forEach(h => h.draw());
  globe.draw();
}

export function windowResized({ windowWidth, windowHeight }) {
  resizeCanvas(windowWidth, windowHeight);
  hills.forEach((h) => h.calc());
  buildBackground();
  generateStarfield();
  globe.render();
}

function shakeGlobe() {
  const shakeTime = 5000;
  globe.shake();
  if (shakeTimer) clearInterval(shakeTimer);
  shakeTimer = setTimeout(() => globe.place(), shakeTime);
}
