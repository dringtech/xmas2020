import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';
const { random, push, translate, ellipse, pop } = p5;

export default class Moon extends FlexiClass {
  constructor(opts) {
    super(opts, {
      x: random(p5.width),
      y: random(p5.height),
      r: 100,
    });
  }

  draw() {
    push();
    translate(this.x, this.y);
    ellipse(0, 0, this.r);
    pop();
  }
}