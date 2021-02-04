import React from 'react'
import Line from './Line'
const Page = ({
  startNote, 
  notes, 
  lineIndex, 
  measureIndex,
  cntWidth,
  cntHeight
}) => {
  if(startNote.epsilon) return null
  const totalYSpace = lineIndex.reduce((totalYSpace, li) => {
    const note = notes[li]
    if(note.epsilon) return totalYSpace;
    return totalYSpace + note.lineStart.heightSpace;
  }, 0)
  return <svg width={cntWidth} height={cntHeight}>
    <rect width={cntWidth} height={cntHeight} 
      style={{strokeWidth: 1, stroke:'black', fill: 'none'}}
    >
    {
      lineIndex.map((li, k) => {
        const note = notes[li]
        if(note.epsilon) return null
        return <Line 
          key={k}
          startNote={notes[li]}
          notes={notes}
          measureIndex={measureIndex}
          cntWidth={cntWidth}
          cntHeight={cntHeight * (
            notes[li].lineStart.heightSpace / totalYSpace
          )}
        />
      })
    }
    </rect>
  </svg>
}
export default Page