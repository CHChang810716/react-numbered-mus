
const setPointAnalysis = (notes) => {
  let tempoPerMeasure = 4;
  let noteTypePerTempo = 4;
  let currTempo = 0;
  for(let i = 0; i < notes.length; i++) {
    const note = notes[i];
    if(note.tempoPerMeasure !== undefined) {
      tempoPerMeasure = note.tempoPerMeasure;
    }
    if(note.noteTypePerTempo !== undefined) {
      noteTypePerTempo = note.noteTypePerTempo;
    }
    if(note.measureStart) {
      currTempo = 0
    }
    if(currTempo === 0) {
      note.setPoint = true;
    }
    if(note.noteType === undefined) {
      currTempo = 0
      continue;
    }
    currTempo += ( noteTypePerTempo / note.noteType );
    if(currTempo - Math.floor(currTempo) < 0.0001) {
      currTempo = 0;
    }
  }
  return notes;
}

export default setPointAnalysis