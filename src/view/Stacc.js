import React from 'react'
import {
  STACC_Y_SEED,
  underBarStyle
} from '../bits/note-utils'
import { rectUnion } from '../bits/utils';

const STACC_E_SEED = 0.7;
const Stacc = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  const staccEH = STACC_E_SEED * sizeRatio
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(!note.stacc) continue;
    const kr = note.pos.keyRect
    const nr = rectUnion([note.pos.keyRect, note.pos.octaveDotsRect])
    const ny = (kr.y - nr.y) < (2 * sizeRatio) ? kr.y : nr.y;
    const mx = nr.x + (nr.width / 2)
    const my = ny + (STACC_Y_SEED * sizeRatio)
    const x0 = mx - staccEH;
    const x1 = mx + staccEH;
    const y0 = my - staccEH;
    const y1 = my + staccEH;

    res.push(<line key={k++} x1={x0} y1={y0} x2={x1} y2={y1} style={underBarStyle}/>)
    res.push(<line key={k++} x1={x1} y1={y0} x2={x0} y2={y1} style={underBarStyle}/>)
  }
  return res
}

export {Stacc};