import React from 'react'
import {
  NOTE_BTN_L2_X_SEED,
  NOTE_BTN_L2_Y_SEED,
  underBarStyle
} from '../bits/note-utils'
import { gnrlFontStyle } from '../bits/utils';

const BL2_LABLE_FONT_SIZE_SEED = 3.25;
const BL2_LABLE_WIDTH_SEEDS = {
  ppp: 6,
  pp: 4,
  p: 2,
  mp: 4,
  fp: 4,
  mf: 4,
  f: 2,
  ff: 4,
  fff: 6,
}

const BL2Label = ({notes, startNoteI, endNoteI, sizeRatio, ntProp}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note[ntProp] === undefined) continue;
    const tL2LabelWidth = BL2_LABLE_WIDTH_SEEDS[ntProp] * sizeRatio;
    const kr = note.pos.keyRect
    const nx = kr.x + (kr.width / 2)
    const ny = kr.y + (kr.height / 2)
    const x = nx + (NOTE_BTN_L2_X_SEED * sizeRatio) + note.bl2Pos.x
    const y = ny + (NOTE_BTN_L2_Y_SEED * sizeRatio)
    const fontSize = BL2_LABLE_FONT_SIZE_SEED * sizeRatio
    const txt = note[ntProp].txt ? note[ntProp].txt : ntProp
    res.push(<text key={k++} x={x} y={y} fontSize={fontSize} style={gnrlFontStyle}>
      {txt}
    </text>)
    // res.push(<line key={k++} x1={x + tL2LabelWidth} x2={x + tL2LabelWidth} y1={y} y2={y + 10} style={underBarStyle}/>)
    note.bl2Pos.x += tL2LabelWidth;
  }
  return res
}

export {BL2Label, BL2_LABLE_WIDTH_SEEDS};