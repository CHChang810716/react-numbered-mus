import React from 'react'
import { underBarStyle } from '../bits/note-utils';
import { svgDbg } from "../bits/utils";
const SM_Y_SEED = 2
const SM_TXT_Y_SEED = -0.8
const SkipMeasures = ({note, sizeRatio}) => {
  const {noteRect, outRect, keyX, keyY, keyRect} = note.pos;
  // const debug = null;
  // const debug2 = null;
  // const debug = <rect
  //     x={noteRect.x} y={noteRect.y}
  //     width={noteRect.width}
  //     height={noteRect.height}
  //     style={svgDbg}
  // />
  // const debug2 = <rect
  //     x={outRect.x} y={outRect.y}
  //     width={outRect.width}
  //     height={outRect.height}
  //     style={svgDbg}
  // />
  const midY = outRect.y + (outRect.height / 2)
  const midX = outRect.x + (outRect.width / 2)
  const y0 = midY - (sizeRatio * SM_Y_SEED);
  const y1 = midY + (sizeRatio * SM_Y_SEED);
  const x0 = outRect.x;
  const x1 = outRect.x + outRect.width
  // return debug2
  return <g>
    <line x1={x0} y1={y0} x2={x0} y2={y1} style={underBarStyle}/>
    <line x1={x1} y1={y0} x2={x1} y2={y1} style={underBarStyle}/>
    <line x1={x0} y1={midY} x2={x1} y2={midY} style={underBarStyle}/>
    <text 
      x={midX} y={midY + (SM_TXT_Y_SEED * sizeRatio)}
      fontSize={keyRect.fsize}
      textAnchor="middle"
    >
      { note.skipMeasures }
    </text>
  </g>
}

export default SkipMeasures