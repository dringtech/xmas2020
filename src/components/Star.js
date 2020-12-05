import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';

const { random, push, color, stroke, strokeWeight, translate, rotate, line, pop } = p5;

function* twinkle() {
  let angle = random(2*Math.PI);
  const inc = Math.PI / (random(3)+5);
  while (true) {
    yield { x: Math.cos(angle)+1, y: Math.sin(angle)+1 };
    angle += inc;
  }
}

export default class Star extends FlexiClass {
  constructor(opts) {
    super(opts, {
      stroke: color('hsla(60, 100%, 50%, 1)'),
      x: random(p5.width),
      y: random(p5.height),
      width: 20,
      height: 50,
      rotation: 0,
    });
    this.twinkle = twinkle();
  }

  draw() {
    const t = this.twinkle.next().value;
    const w = this.width * t.x;
    const h = this.height * t.y;
    push();
    stroke(this.stroke);
    strokeWeight(2);
    translate(this.x, this.y);
    rotate(this.rotation);
    translate(-w / 2, -h / 2);
    line(0, h / 2, w, h / 2);
    line(w / 2, 0, w / 2, h);
    pop();
  }
}
