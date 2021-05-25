import { ascentNumToTune, ascentNumToTuneID, tuneShift, ascentForKey, ascentForNote, keyShift } from "./tune-shift";

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
  return [0, 1 , null].map(
    ahint => tuneShift(keyTxt, ascent, shift, ahint)
  )
}
const keyShiftBasedFit = (ref, cands, keyShift) => {
  const tRefTrans = ref.keyTxt - 1 + keyShift;
  const refTrans = (tRefTrans < 0 ? tRefTrans + 7 : (tRefTrans % 7)) + 1;
  for(const n of cands) {
    if(n.keyTxt == refTrans) {
      return n;
    }
  }
  if(cands[2]) return cands[2]
  if(cands[1]) return cands[1];
  if(cands[0]) return cands[0];
}
const numericStaffScore = ({notes}, 
  currTuneAscent = {
    sign: undefined, num: 0
  }, 
  currContextAscent = [
    null, null, null, null, 
    null, null, null, null, 
  ], 
  outputContextAscent = [
    null, null, null, null, 
    null, null, null, null, 
  ],
  currKeyShift = 0
) => {
  for (const note of notes) {
    if(note.tuneAscent) {
      currTuneAscent = note.tuneAscent;
      note.baseTune = ascentNumToTune(
        note.tuneAscent.sign,
        note.tuneAscent.num
      )
      currKeyShift = keyShift(note.baseTune)
      delete note.tuneAscent
    }
    if(note.measureStart) {
      for(const i in currContextAscent) {
        currContextAscent[i] = null
      }
      for(const i in outputContextAscent) {
        outputContextAscent[i] = null
      }
    }
    if(note.apg) {
      note.apg = numericStaffScore(
        {notes: note.apg}, currTuneAscent, currContextAscent, 
        outputContextAscent, currKeyShift
      ).notes
    }
    if(note.keyTxt === undefined) continue;
    if(note.keyTxt === 0) continue;
    if(note.ascent !== undefined) {
      currContextAscent[note.keyTxt] = note.ascent;
    }
    const noteAscent = ascentForNote(
      currTuneAscent, note.keyTxt, currContextAscent[note.keyTxt]
    )
    const candTrans = keyTxtTransform(
      currTuneAscent, note.keyTxt, noteAscent
    )
    const {keyTxt, ascent, octaveShift} = keyShiftBasedFit(
      note, candTrans, currKeyShift
    );
    note.keyTxt  = keyTxt
    if(outputContextAscent[keyTxt] !== ascent) {
      note.ascent = ascent
      outputContextAscent[keyTxt] = ascent
    }
    if(octaveShift != 0) {
      if(!note.octave) note.octave = 0;
      note.octave += octaveShift
    }
    // if(note.measureStart) {
    // }
  }
  return {notes}
}

export {numericStaffScore}