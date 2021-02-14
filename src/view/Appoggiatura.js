import React from 'react'
import { underBarStyle } from '../bits/note-utils';
import { QCurve } from '../bits/utils';

const FONT_SIZE_SEED = 2.6
const X_SEED = -0.05;
const Y_SEED = 0.25;
const Y_SHIFT_SEED = 1.6;
const X_SHIFT_SEED = 1;
const UNDER_BAR_LENGTH_SEED = FONT_SIZE_SEED * 0.25;
const UNDER_BAR_Y_SEED = Y_SEED + 0.14;
const Appoggiatura = ({note, sizeRatio}) => {
  if(note.apg === undefined) {
    console.warn("appoggiatura require apg property")
    return null;
  }
  const fontSize = sizeRatio * FONT_SIZE_SEED
  const {pos, apg} = note;
  const {outRect, noteRect} = pos
  const midX = noteRect.x + (sizeRatio * X_SEED)
  const midY = noteRect.y + (sizeRatio * Y_SEED)
  const nx = noteRect.x + (sizeRatio * X_SHIFT_SEED);
  const ny = midY + (sizeRatio * Y_SHIFT_SEED)
  const txt = apg.reduce((prev, nt) => {
    return prev + nt.keyTxt
  }, '')
  const underBarLen = sizeRatio * UNDER_BAR_LENGTH_SEED * apg.length
  const ubX0 = midX - underBarLen;
  const ubX1 = midX + underBarLen;
  const ubY0 = midY + (sizeRatio * UNDER_BAR_Y_SEED);
  return [
    <text key={0} fontSize={fontSize} 
      x={midX} y={midY} 
      textAnchor="middle"
    >
      {txt}
    </text>,
    <QCurve key={1}
      p0={[midX, ubY0]}
      p1={[nx, ny]}
      qp={[midX, ny]}
    />,
    <line key={2} x1={ubX0} y1={ubY0} x2={ubX1} y2={ubY0} style={underBarStyle}/>
  ]
}

export default Appoggiatura;