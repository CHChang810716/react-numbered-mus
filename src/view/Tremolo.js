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

const LineNImpl = ({xi, yi, sizeRatio, spanY0}) => {
  const tremoloSx = TREMOLO_SX_SEED * sizeRatio;
  const tremoloSy = TREMOLO_SY_SEED * sizeRatio;
  const tremoloDy = TREMOLO_DY_SEED * sizeRatio;
  const x1_ =  xi - tremoloSx;
  const y0 = spanY0(yi, tremoloDy)
  const x0 = y0.map(n => xi);
  const x1 = y0.map(n => x1_);
  const y1 = y0.map(n => n + tremoloSy)
  return <g>{
    zip(x0, y0, x1, y1).map(([ex0, ey0, ex1, ey1], i) => {
      return <line key={i} x1={ex0} y1={ey0} x2={ex1} y2={ey1} style={underBarStyle}/>
    })
  }</g>
}
const LineN = ({xi, yi, sizeRatio, n}) => {
  return LineNImpl({xi, yi, sizeRatio, 
    spanY0: (yi, tremoloDy) => {
      if(n < 3) {
        return [...Array(n).keys()].map( i => yi + ((i + 1) * tremoloDy))
      } else {
        return [...Array(n).keys()].map( i => yi + (i * tremoloDy))
      }
    }
  })
}
const Line3 = ({xi, yi, sizeRatio}) => {
  return LineN({xi, yi, sizeRatio, n: 3})
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
    if(!Number.isInteger(note.tremolo)) {
      res.push(<Line3 key={k++} 
        xi={kr.x + tremoloKx} yi={kr.y + tremoloKy} sizeRatio={sizeRatio}
      />)
    } else {
      res.push(<LineN key={k++} 
        xi={kr.x + tremoloKx} yi={kr.y + tremoloKy} sizeRatio={sizeRatio}
        n={note.tremolo}
      />)
    }
  }
  return res
}

export {Tremolo};