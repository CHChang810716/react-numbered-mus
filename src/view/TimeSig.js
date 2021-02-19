import React from 'react'
import {
  MEASURE_NOTATION_X_SEED, 
  MEASURE_NOTATION_Y_SEED, 
  MEASURE_NOTATION_FSIZE_SEED,
  underBarStyle
} from '../bits/note-utils'
const TIME_SIG_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const TIME_SIG_WIDTH_SEED = TIME_SIG_FONT_SIZE_SEED * 2;
const TimeSig = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.tempoPerMeasure === undefined) continue;
    if(note.measureNot === undefined) {
      console.warn("tempoPerMeasure prop should appear with measureStart")
      continue;
    }
    const timeSigWidth = TIME_SIG_WIDTH_SEED * sizeRatio;
    const [mx, my, mw, mh] = note.measurePos
    const x = mx + (MEASURE_NOTATION_X_SEED * sizeRatio) + note.measureNot.x
    const y = my + (MEASURE_NOTATION_Y_SEED * sizeRatio)
    const fontSize = TIME_SIG_FONT_SIZE_SEED * sizeRatio
    res.push(<text key={k++} x={x} y={y} fontSize={fontSize}>
      {note.tempoPerMeasure}/{note.noteTypePerTempo}
    </text>)
    // res.push(<line key={k++} x1={x + timeSigWidth} x2={x + timeSigWidth} y1={y} y2={y + 10} style={underBarStyle}/>)
    note.measureNot.x += timeSigWidth;
  }
  return res
}

export default TimeSig