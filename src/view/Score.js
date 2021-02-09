import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
import Page from './Page'
import { pagePositionAnalysis } from '../bits/position-analysis'
import { slurPositionAnalysis } from '../bits/slur-position-analysis'

const NOTE_SIZE_RATE_SEED = 0.005263

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
 *      baseTune: 60,
 *      slur: {
 *        flag: <true/false>,
 *        id: <string>
 *      }
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

const notesSpaceAnalysis = (
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
  ] = notesSpaceAnalysis(
    score.notes,{
      maxMeasureNumInLine, 
      minLineHeight,
      pageCntWidth,
      pageCntHeight,
      yRate, // space * rate = real length
      xRate
    }
  )

  const sizeRatio = pageCntWidth * NOTE_SIZE_RATE_SEED
  return <div>{
    pageIndex.map((pi, k) => <Page 
      key={k}
      notes={notes}
      startNoteI={pi}
      cntWidth={pageCntWidth}
      cntHeight={pageCntHeight}
      sizeRatio={sizeRatio}
    />)
  }</div>
}
export default Score
