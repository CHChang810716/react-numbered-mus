import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
import Page from './Page'
import { pagePositionAnalysis } from '../bits/position-analysis'
import { curveIndex } from '../bits/note-utils'

const BASE_LINE_HEIGHT_SEED = 20

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

const notesSpaceAnalysis = (
  notes, {
    pageCntHeight,
    maxLineWeight,
    size
  }
) => {
  for(let i = 0; i < notes.length; i ++) {
    notes[i].id = i;
  }
  const pageCntHeightSpace = pageCntHeight / size
  const [notes0, measureIndex] = measureSpaceAnalysis(notes);
  const [notes1, lineIndex] = lineSpaceAnalysis(
    notes0, measureIndex, maxLineWeight, BASE_LINE_HEIGHT_SEED
  );
  const [notes2, pageIndex] = pageSpaceAnalysis(notes1, pageCntHeightSpace)

  // annotation analysis
  const notes3 = underBarAnalysis(notes2);
  return [notes3, measureIndex, lineIndex, pageIndex];
}
const Score = ({
  score,
  pageCntWidth,
  pageCntHeight,
  maxLineWeight, 
  size,
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
      pageCntWidth,
      pageCntHeight,
      maxLineWeight, 
      size,
    }
  )
  return <div>{
    pageIndex.map((pi, k) => <div key={k}><Page 
      notes={notes}
      startNoteI={pi}
      cntWidth={pageCntWidth}
      cntHeight={pageCntHeight}
      sizeRatio={size}
    /></div>)
  }</div>
}
export default Score
