import { curvePositionAnalysis } from "../bits/curve-position-analysis"
import React from 'react'

const Y_SHIFT_SEED = -1.5;
const FONT_SIZE_SEED = 2.5;

const Triplet = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const fontSize = sizeRatio * FONT_SIZE_SEED
  const curveIter = curvePositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, "triplet")
  const curv = []
  const txt = []
  let elem = curveIter.next()
  let k = 0
  while(!elem.done) {
    const {x0, y0, x1, y1} = elem.value.props
    const midX = (x0 + x1) / 2
    const midY = (y0 + y1) / 2
    const y = midY + (sizeRatio * Y_SHIFT_SEED)
    curv.push(elem.value)
    txt.push(<text 
      key={k++}
      x={midX} y={y} 
      fontSize={fontSize} 
      textAnchor="middle">3</text>
    )
    elem = curveIter.next()
  }
  return <g>
    {curv}
    {txt}
  </g>;
}

export default Triplet