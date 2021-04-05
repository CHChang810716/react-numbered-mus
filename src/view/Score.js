import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
import Page from './Page'
import { pagePositionAnalysis } from '../bits/position-analysis'
import { curveIndex } from '../bits/note-utils'
import { Header, HEADER_HEIGHT_SEED } from './Header'


const BASE_LINE_HEIGHT_SEED = 20
const LINE_X_PADDING_SEED = 5;

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
 *      baseTune: D,
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

const notesSpaceAnalysis = (
  notes, {
    pageCntHeight,
    maxLineWeight,
    size,
    spPageCntHMap
  }
) => {
  for(let i = 0; i < notes.length; i ++) {
    notes[i].id = i;
  }
  const pageCntHeightSpace = pageCntHeight/ size
  const spPageCntHS = spPageCntHMap.map(n => n / size);
  const [notes0, measureIndex] = measureSpaceAnalysis(notes);
  const [notes1, lineIndex] = lineSpaceAnalysis(
    notes0, measureIndex, maxLineWeight, BASE_LINE_HEIGHT_SEED
  );
  const [notes2, pageIndex] = pageSpaceAnalysis(notes1, pageCntHeightSpace, spPageCntHS)

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
  title = "untitled",
  renderHeader = false
}) => {
  const sNotes = score.notes;
  if(!sNotes[sNotes.length - 1].epsilon) {
    sNotes.push({
      keyTxt: 0, 
      noteType: 1, 
      epsilon: true
    })
  }
  const headerHeight = HEADER_HEIGHT_SEED * size;
  const spPageCntHMap = []
  if(renderHeader) {
    spPageCntHMap.push(
      pageCntHeight - headerHeight
    )
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
      spPageCntHMap
    }
  )
  const xPadding = size * LINE_X_PADDING_SEED;
  const yTopMargin = 0;
  return <div>{
    pageIndex.map((pi, k) => {
      if(notes[pi].epsilon) return null
      const cntWidth  = pageCntWidth - (2 * xPadding);
      let   cntHeight = pageCntHeight - (2 * yTopMargin);
      const x = xPadding
      let   y = yTopMargin
      const needRenderHeader = k === 0 && renderHeader
      if(needRenderHeader) {
        cntHeight -= headerHeight;
        y += headerHeight;
      }
      return <div key={k}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={pageCntWidth} height={pageCntHeight}>
          {needRenderHeader && <Header 
            x={x}
            y={yTopMargin}
            width={pageCntWidth}
            height={headerHeight}
            title={title}
            sizeRatio={size}
          />}
          <Page 
            notes={notes}
            startNoteI={pi}
            x={x}
            y={y}
            cntWidth={cntWidth}
            cntHeight={cntHeight}
            sizeRatio={size}
          />
        </svg>
      </div>
    })
  }</div>
}
export default Score
