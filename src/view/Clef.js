import React from 'react'
import {
  MEASURE_NOTATION_X_SEED, 
  MEASURE_NOTATION_Y_SEED, 
  MEASURE_NOTATION_FSIZE_SEED,
  underBarStyle
} from '../bits/note-utils'
const CLEF_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const CLEF_WIDTH_SEED = CLEF_FONT_SIZE_SEED * 2.6;
const Clef = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.baseTune === undefined) continue;
    if(note.measureNot === undefined) {
      console.warn("baseTune prop should appear with measureStart")
      continue;
    }
    const clefWidth = CLEF_WIDTH_SEED * sizeRatio;
    const [mx, my, mw, mh] = note.measurePos
    const x = mx + (MEASURE_NOTATION_X_SEED * sizeRatio) + note.measureNot.x
    const y = my + (MEASURE_NOTATION_Y_SEED * sizeRatio)
    const fontSize = CLEF_FONT_SIZE_SEED * sizeRatio
    res.push(<text key={k++} x={x} y={y} fontSize={fontSize}>
      1={note.baseTune}
    </text>)
    // res.push(<line key={k++} x1={x + clefWidth} x2={x + clefWidth} y1={y} y2={y + 10} style={underBarStyle}/>)
    note.measureNot.x += clefWidth;
  }
  return res
}

export default Clef