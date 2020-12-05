import p5 from './p5';

const { random } = p5;

export default function* position(cols, rows) {
  const xOff = p5.width / cols;
  const yOff = p5.height / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + random(1)) * xOff;
      const y = (r + random(1)) * yOff;
      yield { x, y };
    }
  }
}
