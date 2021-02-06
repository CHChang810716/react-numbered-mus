import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
import Page from './Page'
/**
 * score = {
 *  notes = [
 *    {
 *      [must]
 *      keyTxt: <[0-7]>,
 *      noteType: <1, 2, 4, 8, 16, 32, 64,...>
 * 
 *      [optional]
 *      ascent: <[0, 1, 2]>, 0: b, 1: #, 2: <none> 
 *      octave: <int>,
 *      curve: "start",
 *      measureStart: true, // measure start
 *      tempoPerMeasure: 4,
 *      noteTypePerTempo: 4,
 *      baseTune: 60,
 *      ... plugin
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

const notesAnalysis = (
  notes, {
    maxMeasureNumInLine, 
    minLineHeight,
    pageCntWidth,
    pageCntHeight,
    yRate, // space * rate = real length
    xRate
  }
) => {
  for(let i in notes) {
    notes[i].id = i;
  }
  const maxLineXSpace = pageCntWidth / xRate
  const minLineYSpace = minLineHeight / yRate
  const [notes0, measureIndex] = measureSpaceAnalysis(notes);
  const [notes1, lineIndex] = lineSpaceAnalysis(
    notes0, measureIndex, maxLineXSpace, 
    maxMeasureNumInLine, minLineYSpace
  );
  const pageCntHeightSpace = pageCntHeight / yRate
  const [notes2, pageIndex] = pageSpaceAnalysis(notes1, pageCntHeightSpace)

  // annotation analysis
  const notes3 = underBarAnalysis(notes2);
  return [notes3, measureIndex, lineIndex, pageIndex];
}
// function* makePageIter(notes) {
//   if(notes.length === undefined) {
//     throw new Error("notes must be array");
//   }
//   const buffer = notes;
//   if(notes.length > 1) {
//     let note = notes[0];
//     while(!note.epsilon) {
//       yield note;
//       note = buffer[note.pageStart.next]
//     }
//   }
// }
const Score = ({
  score,
  maxMeasureNumInLine, 
  minLineHeight,
  pageCntWidth,
  pageCntHeight,
  yRate, // space * rate = real length
  xRate
}) => {
  const sNotes = score.notes;
  if(!sNotes[sNotes.length - 1].epsilon) {
    sNotes.push({
      keyTxt: 0, 
      noteType: 1, 
      epsilon: true
    })
  }
  const [
    notes, measureIndex, 
    lineIndex, pageIndex
  ] = notesAnalysis(
    score.notes,{
      maxMeasureNumInLine, 
      minLineHeight,
      pageCntWidth,
      pageCntHeight,
      yRate, // space * rate = real length
      xRate
    }
  )
  return <div>{
    pageIndex.map((pi, k) => <Page 
      key={k}
      notes={notes}
      startNoteI={pi}
      cntWidth={pageCntWidth}
      cntHeight={pageCntHeight}
    />)
  }</div>
}
export default Score
