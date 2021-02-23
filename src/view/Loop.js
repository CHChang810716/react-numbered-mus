import React from 'react'
import { underBarStyle } from '../bits/note-utils'

const BAR_X_SHIFT_SEED = 0.5
const DOT_X_SHIFT_SEED = 0.8
const DOT_R_SEED = 0.4 
const DOT_DIS_SEED = 1.6

const LoopBegin = ({x, y, w, h, sizeRatio}) => {
  const barXShift = sizeRatio * BAR_X_SHIFT_SEED;
  const dotR = sizeRatio * DOT_R_SEED;
  const dotDisH = sizeRatio * DOT_DIS_SEED / 2;
  const dotXShift = sizeRatio * DOT_X_SHIFT_SEED;
  const lx = x + barXShift;
  const ly0 = y;
  const ly1 = y + h;
  const dym = y + (h / 2);
  const dy0 = dym - dotDisH;
  const dy1 = dym + dotDisH;
  const dx  = lx + dotXShift;
  return <g>
    <line style={underBarStyle} x1={lx} y1={ly0} x2={lx} y2={ly1} />
    <circle fill="black" r={dotR} cx={dx} cy={dy0} />
    <circle fill="black" r={dotR} cx={dx} cy={dy1} />
  </g>
}
const LoopEnd = ({x, y, w, h, sizeRatio}) => {
  const barXShift = sizeRatio * BAR_X_SHIFT_SEED;
  const dotR = sizeRatio * DOT_R_SEED;
  const dotDisH = sizeRatio * DOT_DIS_SEED / 2;
  const dotXShift = sizeRatio * DOT_X_SHIFT_SEED;
  const lx = x + w - barXShift;
  const ly0 = y;
  const ly1 = y + h;
  const dym = y + (h / 2);
  const dy0 = dym - dotDisH;
  const dy1 = dym + dotDisH;
  const dx  = lx - dotXShift;
  return <g>
    <line style={underBarStyle} x1={lx} y1={ly0} x2={lx} y2={ly1} />
    <circle fill="black" r={dotR} cx={dx} cy={dy0} />
    <circle fill="black" r={dotR} cx={dx} cy={dy1} />
  </g>
}

export {LoopBegin, LoopEnd}