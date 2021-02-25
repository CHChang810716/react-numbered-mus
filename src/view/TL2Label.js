import React from 'react'
import {
  NOTE_TOP_L2_X_SEED,
  NOTE_TOP_L2_Y_SEED,
  underBarStyle
} from '../bits/note-utils'
import { gnrlFontStyle } from '../bits/utils';

const TL2_LABLE_FONT_SIZE_SEED = 3;
const TL2_LABLE_WIDTH_SEEDS = {
  pizz: 8,
  solo: 8,
  arco: 8,
  tutti: 10,
  rit: 8,
  rubato: 12
}
const TXT = {
  rit: 'rit.'
}

const TL2Label = ({notes, startNoteI, endNoteI, sizeRatio, ntProp}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note[ntProp] === undefined) continue;
    const tL2LabelWidth = TL2_LABLE_WIDTH_SEEDS[ntProp] * sizeRatio;
    const kr = note.pos.keyRect
    const nx = kr.x + (kr.width / 2)
    const ny = kr.y + (kr.height / 2)
    const x = nx + (NOTE_TOP_L2_X_SEED * sizeRatio) + note.tl2Pos.x
    const y = ny + (NOTE_TOP_L2_Y_SEED * sizeRatio)
    const fontSize = TL2_LABLE_FONT_SIZE_SEED * sizeRatio
    const txt = TXT[ntProp] ? TXT[ntProp] : ntProp
    res.push(<text key={k++} x={x} y={y} fontSize={fontSize} style={gnrlFontStyle}>
      {txt}
    </text>)
    // res.push(<line key={k++} x1={x + tL2LabelWidth} x2={x + tL2LabelWidth} y1={y} y2={y + 10} style={underBarStyle}/>)
    note.tl2Pos.x += tL2LabelWidth;
  }
  return res
}

export {TL2Label, TL2_LABLE_WIDTH_SEEDS};