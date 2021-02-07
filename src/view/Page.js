import React from 'react'
import {svgDbg} from '../bits/utils'
import { pagePositionAnalysis } from '../bits/position-analysis'
import Note from './Note'
import { underBarStyle } from '../bits/note-utils'
import { slurPositionAnalysis } from '../bits/slur-position-analysis'
import { tiePositionAnalysis } from '../bits/tie-position-analysis'


const Page = ({
  notes, 
  startNoteI, 
  cntWidth,
  cntHeight,
  sizeRatio
}) => {
  if(notes[startNoteI].epsilon) return null
  pagePositionAnalysis(notes, startNoteI, cntWidth, cntHeight, sizeRatio)
  let noteViews = []
  let k = 0;
  for(const note of notes) {
    if(note.epsilon) continue
    noteViews.push(<Note key={k++} note={note} noteLayout={note.pos} />)
    if(note.underBarsPos) {
      for(const ub of note.underBarsPos) {
        const [x1, x2, y ] = ub 
        noteViews.push(<line key={k++} x1={x1} y1={y} x2={x2} y2={y} style={underBarStyle}/>)

      }
    }
    if(note.measurePos) {
      const [x, y, w, h] = note.measurePos
      noteViews.push(<line key={k++} x1={x+w} y1={y} x2={x+w} y2={y+h} style={underBarStyle}/>)
    }
    if(note.lineStart) {
      const [x, y, w, h] = note.measurePos
      noteViews.push(<line key={k++} x1={x} y1={y} x2={x} y2={y+h} style={underBarStyle}/>)
    }
  }
  const slurs = slurPositionAnalysis(notes, sizeRatio)
  const ties = tiePositionAnalysis(notes, sizeRatio)
  return <svg width={cntWidth} height={cntHeight}>
    <g>
      {noteViews}
      {slurs}
      {ties}
    </g>
  </svg>
}
export default Page