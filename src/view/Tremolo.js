import React from 'react'
import {
  underBarStyle
} from '../bits/note-utils'
import { rectUnion } from '../bits/utils';
import { zip } from 'zip-array';
const TREMOLO_SX_SEED = 1.3;
const TREMOLO_SY_SEED = TREMOLO_SX_SEED * 0.85;
const TREMOLO_DY_SEED = 0.7;
const TREMOLO_KX_SEED = 3.4;
const TREMOLO_KY_SEED = 1.2;

const Line3 = ({xi, yi, sizeRatio}) => {
  const tremoloSx = TREMOLO_SX_SEED * sizeRatio;
  const tremoloSy = TREMOLO_SY_SEED * sizeRatio;
  const tremoloDy = TREMOLO_DY_SEED * sizeRatio;
  const x1_ =  xi - tremoloSx;
  const x0 = [xi, xi, xi]
  const x1 = [x1_, x1_, x1_];
  const y0 = [yi, yi + tremoloDy, yi + (tremoloDy * 2)] 
  const y1 = y0.map(n => n + tremoloSy)
  return <g>{
    zip(x0, y0, x1, y1).map(([ex0, ey0, ex1, ey1], i) => {
      return <line key={i} x1={ex0} y1={ey0} x2={ex1} y2={ey1} style={underBarStyle}/>
    })
  }</g>
}

const Tremolo = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const tremoloKx = TREMOLO_KX_SEED * sizeRatio;
  const tremoloKy = TREMOLO_KY_SEED * sizeRatio;
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(!note.tremolo) continue;
    const kr = note.pos.keyRect;
    res.push(<Line3 key={k++} 
      xi={kr.x + tremoloKx} yi={kr.y + tremoloKy} sizeRatio={sizeRatio}
    />)
  }
  return res
}

export {Tremolo};