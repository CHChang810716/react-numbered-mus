import React from 'react'
import {
  MARCATO_Y_SEED,
  underBarStyle
} from '../bits/note-utils'
import { rectUnion } from '../bits/utils';

const MARCATO_E_SEED = 0.7;
const MARCATO_FSIZE_SEED = 4;
const Marcato = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  const marcatoEH = MARCATO_E_SEED * sizeRatio
  const marcatoFsize = MARCATO_FSIZE_SEED * sizeRatio
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(!note.marcato) continue;
    const kr = note.pos.keyRect
    const nr = rectUnion([note.pos.keyRect, note.pos.octaveDotsRect])
    const ny = (kr.y - nr.y) < (2 * sizeRatio) ? kr.y : nr.y;
    const mx = nr.x + (nr.width / 2)
    const my = ny + (MARCATO_Y_SEED * sizeRatio)
    const x0 = mx - marcatoEH;
    const x1 = mx + marcatoEH;
    const y0 = my - marcatoEH;
    const y1 = my + marcatoEH;

    res.push(<text key={k++} x={mx} y={my} 
      fontSize={marcatoFsize} textAnchor="middle">{'<'}</text>)
    // res.push(<line key={k++} x1={x0} y1={y0} x2={x1} y2={y1} style={underBarStyle}/>)
    // res.push(<line key={k++} x1={x1} y1={y0} x2={x0} y2={y1} style={underBarStyle}/>)
  }
  return res
}

export {Marcato};