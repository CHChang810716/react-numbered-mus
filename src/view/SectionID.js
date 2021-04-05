import React from 'react'
import { fontSizeToHeight, fontSizeToWidth, svgDbg } from '../bits/utils'

const FONT_SIZE_SEED = 4
const FONT_H_SEED = fontSizeToHeight(FONT_SIZE_SEED)
const FONT_W_SEED = fontSizeToWidth(FONT_SIZE_SEED)
const ID_Y_SHIFT_SEED = -4
const SectionID = ({id, x, y, sizeRatio}) => {
  const fontSize = sizeRatio * FONT_SIZE_SEED
  const fontH = sizeRatio * FONT_H_SEED
  const fontW = sizeRatio * FONT_W_SEED
  const idYShiftSeed = sizeRatio * ID_Y_SHIFT_SEED
  const idMidX = x;
  const idY = y + idYShiftSeed;
  const rectW = fontW * 1.2
  const rectH = fontH * 1.2
  const rectX = idMidX - (rectW / 2)
  const rectY = idY    - (fontH / 2) - (rectH / 2)
  return <g>
    <text 
      fontSize={fontSize}
      x={x} y={y + idYShiftSeed}
      textAnchor="middle"
    >{id}</text>
    <rect x={rectX} y={rectY} height={rectH} width={rectW} style={svgDbg}/>
  </g>
}

export default SectionID