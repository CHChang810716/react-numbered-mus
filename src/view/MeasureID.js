import React from 'react'
import { underBarStyle } from '../bits/note-utils';
import { svgDbg } from "../bits/utils";
import { MEASURE_ID_Y_OFFSET_SEED } from '../bits/note-utils';
const MEASURE_ID_SIZE_SEED = 3

const MeasureID = ({note, sizeRatio}) => {
  const [x, y, w, h] = note.measurePos
  if(note.lineStart) {
    return <text 
       fontSize={sizeRatio * MEASURE_ID_SIZE_SEED} 
       x={x} y={y + (sizeRatio * MEASURE_ID_Y_OFFSET_SEED)}
       textAnchor="middle"
     >
       {note.measureStart.id}
     </text>
  } else {
    return null
  }
}

export default MeasureID 