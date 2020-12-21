
const { readFileSync, writeFileSync } = require('fs');
const { Midi } = require('@tonejs/midi');

const midiData = readFileSync('silent_night_easy.mid');

const midi = new Midi(midiData);

const extractMidiNoteData = (n) => ({
  note: n.midi,
  velocity: Number(Math.round(n.velocity + 'e2') + 'e-2'),
  duration: Math.floor(n.durationTicks / 240),
});
function createNoteSteps(score, {note, velocity, duration}) {
  const length = duration;
  const rests = Array.from({ length }, () => ({ n: 0 }));
  return [...score, {n: note, v: velocity, l: duration}, ...rests];
}
const tracks = midi.tracks.map(
  (t) => t.notes
    .map(extractMidiNoteData)
    .reduce(createNoteSteps, [])
);

writeFileSync('src/score.json', JSON.stringify(tracks));
