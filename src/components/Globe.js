import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';
import Snowflake from './Snowflake';

const {
  createGraphics,
  image,
  push,
  pop,
  imageMode,
  color,
  random,
  translate,
  CENTER,
  CORNER,
  PI,
} = p5;

export default class Globe extends FlexiClass {
  constructor(props) {
    super(props, () => ({
      width: Math.min(p5.width, p5.height) * 0.7,
      stroke: color(40),
      fill: color('hsla(240, 50%, 50%, 0.1)'),
      margin: 10,
      x: p5.width / 2,
      y: p5.height / 2,
      numFlakes: 200,
      shaking: false,
    }));
    this.generateFlakes();
    this.render();
  }

  generateFlakes() {
    const snowFlakeOpts = () => {
      const r = random(this.width / 2);
      const a = random(2 * PI);
      const globe = this;
      return {
        x: r * Math.sin(a),
        y: r * Math.cos(a),
        collision: (pos, size) => {
          const flakeX = pos.x;
          const flakeY = pos.y;
          const range = Math.sqrt(flakeX * flakeX + flakeY * flakeY);
          const maxRadius = globe.width / 2 - size / 2;
          const collision = range >= maxRadius;
          const angle = Math.atan(flakeX / flakeY) + (flakeY < 0 ? Math.PI : 0);
          const nearPos = {
            x: maxRadius * Math.sin(angle),
            y: maxRadius * Math.cos(angle),
          };
          return {
            dist: maxRadius - range,
            stop: pos.y > (0.8 * globe.width / 2),
            collision,
            ...nearPos,
          };
        },
      };
    };
    this.snow = Array.from(Array(this.numFlakes)).map(
      (_, i) => new Snowflake(snowFlakeOpts(i))
    );
  }
  activateFlakes() {
    this.snow.forEach(s => s.release());
  }

  render() {
    this.parseOpts();
    this.activateFlakes();
    const g = createGraphics(this.width + 2 * this.margin, this.width + 2 * this.margin);
    g.fill(this.fill);
    g.stroke(this.stroke);
    g.strokeWeight(3);
    g.ellipseMode(CORNER);
    g.ellipse(this.margin, this.margin, this.width)
    this.image = g;
  }
  draw() {
    push();
    imageMode(CENTER)
    translate(this.x + (this.shaking ? random(-5, 5) : 0), this.y + (this.shaking ? random(-10, 10) : 0))
    this.snow.forEach(s => s.draw());
    image(this.image, 0, 0);
    pop();
  }
  shake() {
    this.shaking = true;
    this.snow.forEach((s) => s.agitate(this.width));
  }
  place() {
    this.shaking = false;
    this.activateFlakes();
  }
}