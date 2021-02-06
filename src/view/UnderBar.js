import React from 'react'
import { underBarStyle } from '../bits/note-utils';
const UnderBar = ({
  kr0, kr1, level, ntSizeRatio
}) => {
  const space = ntSizeRatio * 1;
  const x0 = kr0.x;
  const x1 = kr1.x + kr1.width;
  const y = kr0.y + kr0.height + (space * (level + 1))
  return <line x1={x0} y1={y} x2={x1} y2={y} style={underBarStyle}/>
}
export default UnderBar