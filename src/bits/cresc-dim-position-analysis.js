import React from 'react'
import { rectUnion } from './utils';
import { crescDimIndex, underBarStyle } from './note-utils'
const CRESC_DIM_H_SEED = 1.8;
const OVERFLOW_SEED = 30;
const BTN_SHIFT_SEED = 6;
const X_PADDING = 1;
const dirSym = {
  cresc: '<',
  dim: '>'
}
const PlotCrescDim = ({x0, x1, y, sizeRatio, dir}) => {
  const xPadding = X_PADDING * sizeRatio;
  const hh = CRESC_DIM_H_SEED * sizeRatio / 2;
  const y0 = y - hh;
  const y1 = y + hh;
  if(dir === '<') {
    return <g>
      <line style={underBarStyle} x1={x0 + xPadding} y1={y} x2={x1 - xPadding} y2={y0} />
      <line style={underBarStyle} x1={x0 + xPadding} y1={y} x2={x1 - xPadding} y2={y1} />
    </g>
  } else if(dir === '>') {
    return <g>
      <line style={underBarStyle} x1={x0 + xPadding} y1={y0} x2={x1 - xPadding} y2={y} />
      <line style={underBarStyle} x1={x0 + xPadding} y1={y1} x2={x1 - xPadding} y2={y} />
    </g>
  }
}
function* crescDimPositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, ntProp) {
  const btnShift = BTN_SHIFT_SEED * sizeRatio
  const index = crescDimIndex(notes, ntProp)
  const dir = dirSym[ntProp]
  let k = 0
  for(const crescDimID in index) {
    const {startNote, endNote, startLine, endLine} = index[crescDimID]
    if(startLine !== endLine) {
      if(startNote.id >= startNoteI && startNote.id < endNoteI) {
        const start = startNote.pos
        const x0 = start.keyRect.x + (start.keyRect.width / 2)
        const [lx, ly, lw, lh] = startLine.linePos;
        const x = lx + lw + (OVERFLOW_SEED * sizeRatio)
        const y = start.keyRect.y + start.keyRect.height + btnShift
        yield <PlotCrescDim key={k++} 
          x0={x0} y={y}
          x1={x} sizeRatio={sizeRatio}
          dir={dir}
        />
      }
      if(endNote.id >= startNoteI && endNote.id < endNoteI) {
        const end = endNote.pos
        const x1 = end.keyRect.x + (end.keyRect.width / 2)
        const [lx, ly, lw, lh] = endLine.linePos;
        const x = lx - (OVERFLOW_SEED * sizeRatio)
        const y = end.keyRect.y + end.keyRect.height + btnShift
        yield <PlotCrescDim key={k++} 
          x0={x} y={y}
          x1={x1} sizeRatio={sizeRatio}
          dir={dir}
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
        const y = Math.max(
          startBR.y + startBR.height, 
          endBR.y + endBR.height
        ) + btnShift
        yield <PlotCrescDim key={k++} 
          x0={x0} y={y} 
          x1={x1} sizeRatio={sizeRatio} 
          dir={dir}
        />
      }
    }
  }
}

export {crescDimPositionAnalysis}