import React from 'react'
import {
  MEASURE_NOTATION_X_SEED, 
  MEASURE_NOTATION_Y_SEED, 
  MEASURE_NOTATION_FSIZE_SEED,
  underBarStyle
} from '../bits/note-utils'
const SPEED_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const SPEED_WIDTH_SEED = SPEED_FONT_SIZE_SEED * 2.6;
const Speed = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.speed === undefined) continue;
    if(note.measureNot === undefined) {
      console.warn("baseTune prop should appear with measureStart")
      continue;
    }
    const speedWidth = SPEED_WIDTH_SEED * sizeRatio;
    const [mx, my, mw, mh] = note.measurePos
    const x = mx + (MEASURE_NOTATION_X_SEED * sizeRatio) + note.measureNot.x
    const y = my + (MEASURE_NOTATION_Y_SEED * sizeRatio)
    const fontSize = SPEED_FONT_SIZE_SEED * sizeRatio
    res.push(<text key={k++} x={x} y={y} fontSize={fontSize}>
      {'\u2669'}={note.speed}
    </text>)
    // res.push(<line key={k++} x1={x + speedWidth} x2={x + speedWidth} y1={y} y2={y + 10} style={underBarStyle}/>)
    note.measureNot.x += speedWidth;
  }
  return res
}

export default Speed