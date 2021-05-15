import React from 'react'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
import Page from './Page'
import { pagePositionAnalysis } from '../bits/position-analysis'
import { curveIndex } from '../bits/note-utils'
import { Header, HEADER_HEIGHT_SEED } from './Header'
import { fontSizeToHeight } from '../bits/utils'
import setPointAnalysis from '../bits/set-point-analysis'


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
 *      baseTune: 'D',
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
  const notes3 = setPointAnalysis(notes2)
  const notes4 = underBarAnalysis(notes3);
  return [notes4, measureIndex, lineIndex, pageIndex];
}
const PAGE_ID_FONT_SIZE_SEED = 3
const PAGE_ID_FONT_H_SEED = fontSizeToHeight(PAGE_ID_FONT_SIZE_SEED)
const Score = ({
  score,
  pageWidth,
  pageHeight,
  maxLineWeight, 
  size,
  renderHeader = false,
  renderPageID = false
}) => {
  const sNotes = score.notes;
  if(!sNotes[sNotes.length - 1].epsilon) {
    sNotes.push({
      keyTxt: 0, 
      noteType: 1, 
      epsilon: true
    })
  }
  const title = score.title ? score.title : "untitled";
  const headerHeight = HEADER_HEIGHT_SEED * size;
  const pageIDFontSize = PAGE_ID_FONT_SIZE_SEED * size;
  const pageIDFontH = PAGE_ID_FONT_H_SEED * size;
  const spPageCntHMap = []
  const xPadding = size * LINE_X_PADDING_SEED;
  const cntWidth  = pageWidth - (2 * xPadding);
  let cntHeight = pageHeight
  if(renderPageID) {
    cntHeight -= pageIDFontH
  }
  if(renderHeader) {
    spPageCntHMap.push(
      cntHeight - headerHeight
    )
  }
  const [
    notes, measureIndex, 
    lineIndex, pageIndex
  ] = notesSpaceAnalysis(
    score.notes,{
      pageCntWidth: cntWidth,
      pageCntHeight: cntHeight,
      maxLineWeight, 
      size,
      spPageCntHMap
    }
  )
  return <div>{
    pageIndex.map((pi, k) => {
      if(notes[pi].epsilon) return null
      const x = xPadding
      let   y = 0 
      let   height = cntHeight
      const needRenderHeader = k === 0 && renderHeader
      if(needRenderHeader) {
        height -= headerHeight;
        y += headerHeight;
      }
      return <div key={k}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={pageWidth} height={pageHeight}>
          {needRenderHeader && <Header 
            x={x}
            y={0}
            width={pageWidth}
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
            cntHeight={height}
            sizeRatio={size}
          />
          {renderPageID && <text 
              x={x + (cntWidth / 2)} 
              y={pageHeight} 
              fontSize={pageIDFontSize}
              textAnchor="middle"
            >
              {k + 1}/{pageIndex.length - 1}
            </text>
          }
        </svg>
      </div>
    })
  }</div>
}
export default Score
