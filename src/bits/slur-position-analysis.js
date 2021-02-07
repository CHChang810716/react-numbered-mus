import React from 'react'
import { rectUnion } from './utils';
const CURVE_SEED = 5;
const bezierCurve = (x0, y0, x1, y1, sx0, sy0, sx1, sy1) => {
  return <path 
    d={`M${x0} ${y0} C ${sx0} ${sy0}, ${sx1} ${sy1}, ${x1} ${y1}`} 
    stroke="black"
    fill="transparent"
  />
}
const plotSlur = (x0, y0, x1, y1, sizeRatio) => {
  const sy0 = y0 - (CURVE_SEED * sizeRatio);
  const sy1 = y1 - (CURVE_SEED * sizeRatio);
  return bezierCurve(x0, y0, x1, y1, x0, sy0, x1, sy1)
}
const slurPositionAnalysis = (notes, sizeRatio) => {
  let plot = []
  let index = {}
  let lineid = -1;
  for(let i = 0; i < notes.length; i ++) {
    const note = notes[i]
    if(note.lineStart) lineid ++;
    if(note.slur === undefined) continue
    const slur = note.slur
    if(slur.flag) {
      index[slur.id] = {
        startNote: note,
        startLine: lineid
      }
    } else {
      const ent = index[slur.id]
      ent.endNote = note
      ent.endLine = lineid
    }
  }
  for(const slurID in index) {
    const {startNote, endNote, startLine, endLine} = index[slurID]
    if(startLine !== endLine) {
      // TODO: cross line slur
      console.warn("currently not support cross line slur")
      continue;
    }
    const start = startNote.pos
    const end = endNote.pos
    const startBR = rectUnion([start.keyRect, start.ascentRect, start.octaveDotsRect])
    const endBR = rectUnion([end.keyRect, end.ascentRect, end.octaveDotsRect])
    const y = Math.min(startBR.y, endBR.y)
    const [x0, y0] = [
      start.keyRect.x + (start.keyRect.width / 2), y
    ] 
    const [x1, y1] = [
      end.keyRect.x + (end.keyRect.width / 2), y
    ] 
    plot.push(
      plotSlur(
        x0, y0, x1, y1,
        sizeRatio
      )
    )
  }
  return plot
  
}

export {slurPositionAnalysis}