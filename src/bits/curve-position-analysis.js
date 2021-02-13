import React from 'react'
import { rectUnion } from './utils';
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
function* curvePositionAnalysis(notes, sizeRatio, ntProp) {
  const topShift = TOP_SHIFT_SEED * sizeRatio
  let plot = []
  let index = {}
  let currLineNote = null;
  for(let i = 0; i < notes.length; i ++) {
    const note = notes[i]
    if(note.lineStart) currLineNote = note;
    const curve = note[ntProp]
    if(curve === undefined) continue
    for(const id of curve) {
      if(index[id] === undefined) {
        // start
        index[id] = {
          startNote: note,
          startLine: currLineNote
        }
      } else {
        // end
        const ent = index[id]
        ent.endNote = note
        ent.endLine = currLineNote
      }
    }
  }
  let k = 0
  for(const curveID in index) {
    const {startNote, endNote, startLine, endLine} = index[curveID]
    const start = startNote.pos
    const end = endNote.pos
    const startBR = rectUnion([start.keyRect, start.ascentRect, start.octaveDotsRect])
    const x0 = start.keyRect.x + (start.keyRect.width / 2)
    const x1 = end.keyRect.x + (end.keyRect.width / 2)
    if(startLine !== endLine) {
      {
        const [lx, ly, lw, lh] = startLine.linePos;
        const x = lx + lw + (OVERFLOW_SEED * sizeRatio)
        const y = start.keyRect.y - topShift
        yield <PlotCurve key={k++} 
          x0={x0} y0={y}
          x1={x} y1={y} sizeRatio={sizeRatio}
        />
      }
      {
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
      const endBR = rectUnion([end.keyRect, end.ascentRect, end.octaveDotsRect])
      const y = Math.min(startBR.y, endBR.y) - topShift
      const y0 = y
      const x1 = end.keyRect.x + (end.keyRect.width / 2)
      const y1 = y
      yield <PlotCurve key={k++} 
        x0={x0} y0={y0} 
        x1={x1} y1={y1} sizeRatio={sizeRatio} 
      />

    }
  }
}

export {curvePositionAnalysis}