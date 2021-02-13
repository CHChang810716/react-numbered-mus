
const DEFAULT_TEMPO_PRE_MEASURE = 4;
const DEFAULT_NOTE_TYPE_PRE_TEMPO = 4;
const weightTrans = (x, r) => {
  if(r === undefined) r = 0.8;
  const res = x * Math.pow(r, Math.log2(x))
  return res;
}
const noteWeight = (note) => {
  if(note.noteType === undefined) {
    return 1;
  }
  return weightTrans(1/note.noteType, 0.85);
}
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
  let measureIndex = [];
  for(let noteI = 0; noteI < notes.length; noteI++) {
    const note = notes[noteI];
    if(note.tempoPerMeasure) {
      tempoPerMeasure = note.tempoPerMeasure;
    }
    if(note.noteTypePerTempo) {
      noteTypePerTempo = note.noteTypePerTempo;
    }
    if(note.measureStart !== undefined || note.epsilon) {
      // measure space analysis
      if(notesInMeasure.length > 0) {
        const totalSpace = notesInMeasure.reduce((s, note) => {
          return s + noteWeight(note)
        }, 0)
        notesInMeasure[0].measureStart = {
          totalSpace: totalSpace,
          id: measureId,
          next: noteI
        };
        if(notesInMeasure[0].skipMeasures) {
          measureId += notesInMeasure[0].skipMeasures
        } else {
          measureId ++;
        }
        let totalWeight = 0;
        let weights = []
        for(const nM of notesInMeasure) {
          const w = noteWeight(nM);
          totalWeight += w;
          weights.push(w)
        }
        const sunit = totalSpace / totalWeight
        for(const nMi in notesInMeasure) {
          const nM = notesInMeasure[nMi]
          const w = weights[nMi]
          nM.measureSpace = w * sunit
        }
      }
      notesInMeasure = []
      measureIndex.push(noteI)
    }
    notesInMeasure.push(note);
  }
  return [notes, measureIndex];
}
export default measureSpaceAnalysis