import FlexiClass from '../utils/FlexiClass';
import p5 from 'p5';

export default class MusicPlayer extends FlexiClass {
  constructor(props) {
    super(props);
    if (!this.score) throw new Error('MusicPlayer needs a score');
    let interval = "8n";
    this.soundLoop = new p5.SoundLoop((t) => this.onLoop(t), interval);
    this.synth = new p5.PolySynth();
    this.synth.setADSR(0.05, 0.7, 0.7, 0.5);
    this.slowDown();
    this.pause();
  }
  start() {
    p5.prototype.userStartAudio();
    this.running = true;
    this.soundLoop.start();
  }
  pause() {
    this.running = false;
    this.soundLoop.pause();
  }
  speedUp() {
    this.soundLoop.bpm = 240;
  }
  slowDown() {
    this.soundLoop.bpm = 120;
  }
  onLoop(timeFromNow) {
    let noteIndex = (this.soundLoop.iterations - 1) % this.score[0].length;
    let noteR = this.score[0][noteIndex];
    if (noteR.n > 0 ) this.synth.play(p5.prototype.midiToFreq(noteR.n), noteR.v, timeFromNow, 0.1);
    let noteL = this.score[1][noteIndex];
    if (noteL.n > 0 ) this.synth.play(p5.prototype.midiToFreq(noteL.n), noteL.v, timeFromNow, 0.1);
  }
}