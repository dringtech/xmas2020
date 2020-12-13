import FlexiClass from '../utils/FlexiClass';
import p5 from '../utils/p5';

const flakeModes = {
  FALLING: 'FALLING',
  REST: 'REST',
  FLURRY: 'FLURRY',
};

const {
  random,
  push,
  pop,
  ellipse,
  ellipseMode,
  noise,
  fill,
  color,
  line,
  stroke,
  CENTER,
} = p5;

export default class Snowflake extends FlexiClass {
  constructor(opts) {
    super(opts, {
      x: random(p5.width / 2),
      y: 0,
      s: { x: 0, y: - p5.height / 600 },
      size: 10,
      flurrySize: 200,
      flurrySeed: random(10000),
    });
    this.mode = flakeModes.FALLING;
    this.flurryScale = 0;
  }
  debugPoc(poc) {
    push();
    fill(color('red'));
    stroke(color('red'));
    line(
      this.x,
      this.y,
      this.pos.x,
      this.pos.y
    );
    ellipse(this.x, this.y);
    ellipse(poc.x, poc.y, 10);
    pop();
  }
  move() {
    switch (this.mode) {
      case flakeModes.FALLING:
        this.y = (this.y - this.s.y) % p5.height;
        break;
      case flakeModes.FLURRY:
        this.x = this.x + random(-0.5, 0.5) * this.agitateSize;
        this.y = this.y + random(-1.1, 1) * this.agitateSize;
        break;
      default:
        break;
    }
    this.drawPos();
  }
  drawPos() {
    const flurry = {
      x:
        this.flurrySize *
        (noise(
          this.x / this.flurrySize + this.flurrySeed,
          this.y / this.flurrySize + this.flurrySeed
        ) -
          0.5),
      y:
        this.flurrySize *
        (noise(
          this.x / this.flurrySize + this.flurrySeed + 1000,
          this.y / this.flurrySize + this.flurrySeed + 1000
        ) -
          0.5),
    };
    this.pos = { x: this.x + flurry.x, y: this.y + flurry.y };
    const poc = this.collision(this.pos, this.size);
    if (poc.collision) {
      if (this.mode == flakeModes.FALLING && poc.stop) this.mode = flakeModes.REST;
      if (this.mode == flakeModes.FLURRY) {
        this.x = poc.x;
        this.y = poc.y;
      }
      this.pos = poc;
    }
  }
  draw() {
    this.move();
    push();
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }
  release() {
    this.mode = flakeModes.FALLING;
  }
  agitate(size) {
    this.agitateSize = size / 20;
    this.mode = flakeModes.FLURRY;
    console.log('FLURRYING');
  }
}
