import FlexiClass from '../utils/FlexiClass';
import images from '../utils/imageStore'; 
import aspect from '../utils/aspect';
import p5 from '../utils/p5';

const { PI, CENTER, createGraphics } = p5;

const drawImage = (g, i, x, y, w, a) => {
  g.push();
  g.translate(x, y);
  g.rotate(a);
  g.image(i, 0, 0, w, w * aspect(i));
  g.pop();
}

export default class Globe extends FlexiClass {
  constructor(props) {
    super(props, () => ({
      state: 'sing',
    }));
    this.createSinging();
    this.createShaking();
  }
  createSinging() {
    const i = createGraphics(400, 400);
    i.imageMode(CENTER);
    drawImage(i, images.g['sing'], 255, 95, 85, -PI / 20);
    drawImage(i, images.r['sing'], 140, 140, 95, -PI / 20);
    drawImage(i, images.m['sing'], 345, 140, 110, 0)
    drawImage(i, images.b['sing'], 55, 180, 110, -PI/20);
    i.image(images.family, 200, 200, 400, 400*aspect(images.family));
    this.singing = i;
  }
  createShaking() {
    const i = createGraphics(400, 400);
    i.imageMode(CENTER);
    drawImage(i, images.g['shake'], 255, 95, 85, -PI / 20);
    drawImage(i, images.r['shake'], 140, 140, 95, -PI / 20);
    drawImage(i, images.m['shake'], 345, 145, 100, 0);
    drawImage(i, images.b['shake'], 55, 185, 110, -PI / 20);
    i.image(images.family, 200, 200, 400, 400 * aspect(images.family));
    this.shaking = i;
  }
  shake() {
    this.state = 'shake';
  }
  sing() {
    this.state = 'sing';
  }
  image() {
    if (this.state === 'sing') return this.singing;
    return this.shaking;
  }
}