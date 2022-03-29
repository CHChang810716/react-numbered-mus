import React from 'react'
import {
  NOTE_TOP_L1_X_SEED,
  NOTE_TOP_L1_Y_SEED,
  underBarStyle
} from '../bits/note-utils'
import { boldFontStyle } from '../bits/utils';

const TL1_LABLE_FONT_SIZE_SEED = 2.5;
const TL1_LABLE_WIDTH_SEEDS = {
  ehpull: 1,
  ehpush: 1
}
const TXT = {
  ehpull: 'ㄇ',
  ehpush: 'V'
}

const TL1Label = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    let noteTL1Pos = note.tl1Pos.x;
    for(const ntProp in TL1_LABLE_WIDTH_SEEDS) {
      if(note[ntProp] === undefined) continue;
      const tL1LabelWidth = TL1_LABLE_WIDTH_SEEDS[ntProp] * sizeRatio;
      const kr = note.pos.keyRect
      const nx = kr.x + (kr.width / 2)
      const ny = kr.y + (kr.height / 2)
      const x = nx + (NOTE_TOP_L1_X_SEED * sizeRatio) + noteTL1Pos
      const y = ny + (NOTE_TOP_L1_Y_SEED * sizeRatio)
      const fontSize = TL1_LABLE_FONT_SIZE_SEED * sizeRatio
      const txt = TXT[ntProp] ? TXT[ntProp] : ntProp
      noteTL1Pos += tL1LabelWidth;
      res.push(<text key={k++} x={x} y={y} fontSize={fontSize} style={boldFontStyle}>
        {txt}
      </text>)
    }
  }
  return res
}

export {TL1Label, TL1_LABLE_WIDTH_SEEDS};