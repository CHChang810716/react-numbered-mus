import React from 'react'
import { rectUnion } from './utils';
import { curveIndex } from './note-utils'
const CURVE_SEED = 0.026;
const OVERFLOW_SEED = 30;
const TOP_SHIFT_SEED = 0.8;
const bezierCurve = (x0, y0, x1, y1, sx0, sy0, sx1, sy1) => {
  return <path 
    d={`M${x0} ${y0} C ${sx0} ${sy0}, ${sx1} ${sy1}, ${x1} ${y1}`} 
    stroke="black"
    fill="transparent"
  />
}
const PlotCurve = ({x0, y0, x1, y1, sizeRatio}) => {
  const f = x1 - x0;
  const sy0 = y0 - (f * CURVE_SEED * sizeRatio);
  const sy1 = y1 - (f * CURVE_SEED * sizeRatio);
  return bezierCurve(x0, y0, x1, y1, x0, sy0, x1, sy1)
}
function* curvePositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, ntProp) {
  const topShift = TOP_SHIFT_SEED * sizeRatio
  const index = curveIndex(notes, ntProp)
  let k = 0
  for(const curveID in index) {
    const {startNote, endNote, startLine, endLine} = index[curveID]
    if(startLine !== endLine) {
      if(startNote.id >= startNoteI && startNote.id < endNoteI) {
        const start = startNote.pos
        const x0 = start.keyRect.x + (start.keyRect.width / 2)
        const [lx, ly, lw, lh] = startLine.linePos;
        const x = lx + lw + (OVERFLOW_SEED * sizeRatio)
        const y = start.keyRect.y - topShift
        yield <PlotCurve key={k++} 
          x0={x0} y0={y}
          x1={x} y1={y} sizeRatio={sizeRatio}
        />
      }
      if(endNote.id >= startNoteI && endNote.id < endNoteI) {
        const end = endNote.pos
        const x1 = end.keyRect.x + (end.keyRect.width / 2)
        const [lx, ly, lw, lh] = endLine.linePos;
        const x = lx - (OVERFLOW_SEED * sizeRatio)
        const y = end.keyRect.y - topShift
        yield <PlotCurve key={k++} 
          x0={x} y0={y}
          x1={x1} y1={y} sizeRatio={sizeRatio}
        />
      }
      continue;
    } else {
      if(startNote.id >= startNoteI && endNote.id < endNoteI) {
        const start = startNote.pos
        const end = endNote.pos
        const startBR = rectUnion([start.keyRect, start.ascentRect, start.octaveDotsRect])
        const x0 = start.keyRect.x + (start.keyRect.width / 2)
        const x1 = end.keyRect.x + (end.keyRect.width / 2)
        const endBR = rectUnion([end.keyRect, end.ascentRect, end.octaveDotsRect])
        const y = Math.min(startBR.y, endBR.y) - topShift
        const y0 = y
        const y1 = y
        yield <PlotCurve key={k++} 
          x0={x0} y0={y0} 
          x1={x1} y1={y1} sizeRatio={sizeRatio} 
        />
      }
    }
  }
}

export {curvePositionAnalysis}