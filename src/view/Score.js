import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
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
 *      measureSplit: true, // measure start
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
 *  measureSplit: true,
 *  epsilon: true
 * }
 * 
 */

/**
 * After layout
 * note = {
 * }
 * 
 */
const notesLayout = (
  notes, {
    maxMeasureNumInLine, 
    maxLineXSpace, 
    minLineYSpace,
    pageCntWidth,
    pageCntHeight,
    lineMargin,
    yRate, // space * rate = real length
    xRate
  }
) => {
  const [notes0, measureIndex] = measureSpaceAnalysis(notes);
  const [notes1, lineIndex] = lineSpaceAnalysis(
    notes0, measureIndex, maxLineXSpace, 
    maxMeasureNumInLine, minLineYSpace
  );
  
  // annotation analysis
  const notes2 = underBarAnalysis(notes1);

  // position analysis
  const pageCntHeightSpace = pageCntHeight / yRate
  const pageLineIndex = []
  for(const ni of lineIndex) {
    
  }
  return notes2;

}
const Score = ({score}) => {

}
