import React from 'react'
import {fontHeightToSize, fontSizeToWidth} from '../bits/utils'

const HEADER_HEIGHT_SEED = 25;
const HEADER_TITLE_FONT_H_SEED = HEADER_HEIGHT_SEED * 0.2
const HEADER_TITLE_FONT_SIZE_SEED = fontHeightToSize(HEADER_TITLE_FONT_H_SEED)

const Header = ({
  x, y,
  width, height,
  title,
  sizeRatio
}) => {
  const headerTitleFontSize = HEADER_TITLE_FONT_SIZE_SEED * sizeRatio
  const headerTitleFontH = HEADER_TITLE_FONT_H_SEED * sizeRatio
  const titleTxtY = y + (height / 2) + (headerTitleFontH / 2)
  const titleTxtXMid = x + (width / 2)
  return <g>
    <text 
      fontSize={headerTitleFontSize} 
      x={titleTxtXMid} y={titleTxtY}
      textAnchor="middle"
    >{title}</text>
  </g>
}

export {Header, HEADER_HEIGHT_SEED};