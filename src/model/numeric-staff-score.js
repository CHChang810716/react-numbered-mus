/**
 * score = {
 *  notes = [
 *    // normal note
 *    {
 *      [must]
 *      key: <[0-7]>,
 *      noteType: <1, 2, 4, 8, 16, 32, 64,...>
 * 
 *      [optional]
 *      ascent: <[0, 1, 2]>, 0: b, 1: #, 2: <none> 
 *      octave: <int>,
 *      halfPoint: <int>,
 *      curve: "start",
 *      measureStart: true, // measure start
 *      tempoPerMeasure: 4,
 *      noteTypePerTempo: 4,
 *      tuneAscent: {
 *        sign: <[0, 1, 2]>, 0: b, 1: #, 2: <none>,
 *        num: <[0, 7]>     
 *      },
 *      speed: 80,
 *      slur: {
 *        flag: <true/false>,
 *        id: <string>
 *      },
 *      apg: [{
 *        keyTxt: 2,
 *        noteType: 8,
 *        octave: 1,
 *        ascent: 0 
 *      }]
 *      ... plugin
 *    }
 *    // skip measures notation
 *    {
 *      skipMeasures: <n>,
 *      measureStart: true
 *    }
 *  ]
 * }
 * 
 * end note = {
 *  keyTxt: 0,
 *  noteType: 1,
 *  epsilon: true
 * }
 * 
 */
const keyTransform = (tuneAscent, key, ascent) => {
  const {sign, num} = tuneAscent;
}
const numericStaffScore = ({notes}) => {
  for (const note of notes) {
    const newNote = {...note};
    delete newNote.key;
    delete newNote.tuneAscent;
    if(note.tuneAscent) {
      // update BaseTune
    }
  }
}

export {numericStaffScore}