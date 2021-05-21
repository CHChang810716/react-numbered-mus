import React from 'react'
import {
  MEASURE_NOTATION_X_SEED, 
  MEASURE_NOTATION_Y_SEED, 
  MEASURE_NOTATION_FSIZE_SEED,
  underBarStyle
} from '../bits/note-utils'
const CLEF_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const CLEF_WIDTH_SEED = CLEF_FONT_SIZE_SEED * 2.6;

const SPEED_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const SPEED_WIDTH_SEED = SPEED_FONT_SIZE_SEED * 3;

const TIME_SIG_FONT_SIZE_SEED = MEASURE_NOTATION_FSIZE_SEED;
const TIME_SIG_WIDTH_SEED = TIME_SIG_FONT_SIZE_SEED * 2;

const FONT_SIZE_SEED = {
  baseTune:         CLEF_FONT_SIZE_SEED,
  speed:            SPEED_FONT_SIZE_SEED,
  tempoPerMeasure:  TIME_SIG_FONT_SIZE_SEED
}
const WIDTH_SEED = {
  baseTune:         CLEF_WIDTH_SEED,
  speed:            SPEED_WIDTH_SEED,
  tempoPerMeasure:  TIME_SIG_WIDTH_SEED
}
const Clef = ({x, y, fontSize, note}) => {
  return <text x={x} y={y} fontSize={fontSize}>
    1={note.baseTune}
  </text>
}
const TimeSig = ({x, y, fontSize, note}) => {
  return <text x={x} y={y} fontSize={fontSize}>
    {note.tempoPerMeasure}/{note.noteTypePerTempo}
  </text>
}
const noteChar = {
  1 : '\u{1d15d}',
  2 : '\u{1d15e}',
  4 : '\u{1d15f}',
  8 : '\u{1d15f}',
  16: '\u{1d151}',
  32: '\u{1d152}',
}
const Speed = ({x, y, fontSize, note}) => {
  const speedType = {
    noteType: 4,
    halfPoint:0 
  }
  if(note.speedType !== undefined) {
    if(note.speedType.noteType) {
      speedType.noteType = note.speedType.noteType
    }
    if(note.speedType.halfPoint) {
      speedType.halfPoint = note.speedType.halfPoint
    }
  }
  let halfPoints = ''
  for(let i = 0; i < speedType.halfPoint; i ++) {
    halfPoints += '.';
  }
  return <text x={x} y={y} fontSize={fontSize}>
    {noteChar[speedType.noteType]}{halfPoints}={note.speed}
  </text>
}
const COMPONENT = {
  baseTune:         Clef,
  speed:            Speed,
  tempoPerMeasure:  TimeSig
}
const MeasureNotations = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.measureNot === undefined) continue;
    let measureNotX = note.measureNot.x;
    for(let ntProp of ['baseTune', 'speed', 'tempoPerMeasure']) {
      if(note[ntProp] === undefined) continue;
      const width = WIDTH_SEED[ntProp] * sizeRatio
      const [mx, my, mw, mh] = note.measurePos
      const x = mx + (MEASURE_NOTATION_X_SEED * sizeRatio) + measureNotX
      const y = my + (MEASURE_NOTATION_Y_SEED * sizeRatio)
      const fontSize = FONT_SIZE_SEED[ntProp] * sizeRatio
      measureNotX += width;
      const Comp = COMPONENT[ntProp]
      res.push(<Comp key={k++} x={x} y={y} fontSize={fontSize} note={note}/>)
    }
  }
  return res
}

export default MeasureNotations