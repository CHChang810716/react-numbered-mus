import { ascentNumToTune, ascentNumToTuneID, tuneShift, ascentForKey, ascentForNote } from "./tune-shift";

/**
 * score = {
 *  notes = [
 *    // normal note
 *    {
 *      [must]
 *      keyTxt: <[0-7]>,
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
 *        keyTxtTxt: 2,
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
 *  keyTxtTxt: 0,
 *  noteType: 1,
 *  epsilon: true
 * }
 * 
 */
const keyTxtTransform = (tuneAscent, keyTxt, ascent) => {
  const {sign, num} = tuneAscent;
  const toTune = ascentNumToTuneID(sign, num);
  const fromTune = 0;
  const shift = fromTune - toTune;
  return tuneShift(keyTxt, ascent, shift)
}
const numericStaffScore = ({notes}) => {
  let currTuneAscent = {
    sign: undefined, num: 0
  };
  let currContextAscent = undefined
  for (const note of notes) {
    if(note.tuneAscent) {
      currTuneAscent = note.tuneAscent;
      note.baseTune = ascentNumToTune(
        note.tuneAscent.sign,
        note.tuneAscent.num
      )
      delete note.tuneAscent
    }
    if(note.measureStart) {
      currContextAscent = undefined;
    }
    if(note.keyTxt === undefined) continue;
    if(note.keyTxt === 0) continue;
    if(note.ascent) {
      currContextAscent = note.ascent;
    }
    const noteAscent = ascentForNote(
      currTuneAscent, note.keyTxt, note.ascent
    )
    const {keyTxt, ascent, octaveShift} = keyTxtTransform(
      currTuneAscent, note.keyTxt, noteAscent
    );
    note.keyTxt  = keyTxt
    note.ascent = ascent
    if(octaveShift != 0) {
      if(!note.octave) note.octave = 0;
      note.octave += octaveShift
    }
  }
  return {notes}
}

export {numericStaffScore}