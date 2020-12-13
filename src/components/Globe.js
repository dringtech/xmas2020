import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';
import Snowflake from './Snowflake';

const globeScale = 1.07;
const snowSceneScale = 0.8;
const aspect = (o) => o.height / o.width;

const {
  createGraphics,
  image,
  push,
  pop,
  imageMode,
  color,
  random,
  translate,
  scale,
  CENTER,
  CORNER,
  PI,
} = p5;

export default class Globe extends FlexiClass {
  constructor(props) {
    super(props, () => ({
      width: Math.min(p5.width, p5.height) * 0.7,
      stroke: color(40),
      fill: color('hsla(240, 50%, 50%, 0.2)'),
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
  resize() {
    this.parseOpts();
    this.activateFlakes();
  }
  render() {
    const g = createGraphics(1000, 1000);
    g.fill(this.fill);
    g.noStroke();
    g.ellipseMode(CORNER);
    g.ellipse(0, 0, 1000)
    this.glass = g;
  }
  draw() {
    push();
    imageMode(CENTER)
    translate(this.x + (this.shaking ? random(-5, 5) : 0), this.y + (this.shaking ? random(-10, 10) : 0))
    scale(this.width);
    image(this.images.snowscene, 0.02, 0.15, snowSceneScale, snowSceneScale * aspect(this.images.snowscene));
    push();
      scale(1/this.width);
      this.snow.forEach(s => s.draw());
    pop();
    image(this.glass, 0, 0, 1, 1);
    image(this.images.globe, 0.007, 0.07, globeScale, globeScale * aspect(this.images.globe));
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