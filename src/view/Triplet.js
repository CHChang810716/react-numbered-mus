import { curvePositionAnalysis } from "../bits/curve-position-analysis"
import React from 'react'

const Y_SHIFT_SEED = -1.5;
const FONT_SIZE_SEED = 2.5;

const Triplet = ({notes, sizeRatio}) => {
  const fontSize = sizeRatio * FONT_SIZE_SEED
  const curveIter = curvePositionAnalysis(notes, sizeRatio, "triplet")
  const res = []
  let elem = curveIter.next()
  while(!elem.done) {
    const {x0, y0, x1, y1} = elem.value.props
    const midX = (x0 + x1) / 2
    const midY = (y0 + y1) / 2
    const y = midY + (sizeRatio * Y_SHIFT_SEED)
    res.push(elem.value)
    res.push(<text 
      x={midX} y={y} 
      fontSize={fontSize} 
      textAnchor="middle">3</text>
    )
    elem = curveIter.next()
  }
  return res;
}

export default Triplet