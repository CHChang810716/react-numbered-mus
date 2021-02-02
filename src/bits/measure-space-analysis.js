import {lcm} from 'mathjs'

const DEFAULT_TEMPO_PRE_MEASURE = 4;
const DEFAULT_NOTE_TYPE_PRE_TEMPO = 4;
/**
 * measure begin note = {
 *  ...existing props
 *  measureStart: {
 *    totalSpace: <n>,
 *    id: <n>
 *  },
 * }
 * all note = {
 *  ...existing props
 *  measureSpace: <n>
 * }
 * 
 * measure index = [<measure start node id>...] the last measure is epsilon
 */
const measureSpaceAnalysis = (notes) => {
  let tempoPerMeasure = DEFAULT_TEMPO_PRE_MEASURE;
  let noteTypePerTempo = DEFAULT_NOTE_TYPE_PRE_TEMPO;
  let notesInMeasure = [];
  let measureId = 1;
  let measureIndex = notes.length > 0 ? [0]: [];
  for(const noteI in notes) {
    const note = notes[noteI];
    if(note.tempoPerMeasure) {
      tempoPerMeasure = note.tempoPerMeasure;
    }
    if(note.noteTypePerTempo) {
      noteTypePerTempo = note.noteTypePerTempo;
    }
    if(note.measureSplit) {
      // measure space analysis
      totalSpace = lcm(...notesInMeasure.map( n => n.noteType ))
      notesInMeasure[0].measureStart = {
        totalSpace: totalSpace,
        id: measureId++
      };
      for(const nM of notesInMeasure) {
        nM.measureSpace = totalSpace / nM.noteType
      }
      notesInMeasure = []
      measureIndex.push(nodeI)
    }
    notesInMeasure.push(note);
  }
  return [notes, measureIndex];
}
export default measureSpaceAnalysis