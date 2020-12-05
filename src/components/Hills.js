import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';
const { noise, color, random, createGraphics, image } = p5;

export default class Hills extends FlexiClass {
  constructor(opts) {
    super(opts, () => ({
      fill: color(240),
      stroke: color(40),
      range: 200,
      base: 100,
      scale: 0.003,
      width: p5.width,
      height: p5.height,
    }));
    this.offset = random(10000);
    this.calc();
  }

  calc() {
    this.parseOpts();
    const gradient = this.top ? (this.top - this.base) / this.width : 0;
    this.points = Array.from(Array(this.width)).map(
      (_, i) => this.base + this.range * noise(this.offset + this.scale * i) + gradient * i
    );
    this.render();
  }

  render() {
    const g = createGraphics(p5.width, p5.height);
    g.scale(1, -1);
    g.translate(0, -this.height);
    g.noFill();
    g.stroke(this.fill);
    g.strokeWeight(1);
    this.points.forEach((y, x) => g.line(x, 0, x, y));
    g.strokeWeight(4);
    g.stroke(this.stroke);
    g.beginShape();
    this.points.forEach((y, x) => g.vertex(x, y));
    g.endShape();
    this.image = g;
  }

  draw() {
    image(this.image, 0, 0);
  }
}
