import React from 'react'
import {svgDbg} from '../bits/utils'
import { pagePositionAnalysis } from '../bits/position-analysis'
import Note from './Note'
import { underBarStyle } from '../bits/note-utils'
import SkipMeasures from './SkipMeasures'
import MeasureID from './MeasureID'
import Appoggiatura from './Appoggiatura'
import Slur from './Slur'
import Tie from './Tie'
import Triplet from './Triplet'
import Clef from './Clef'
import TimeSig from './TimeSig'

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
  const endNoteI = notes[startNoteI].pageStart.next
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.epsilon) continue
    if(note.noteType) {
      noteViews.push(<Note key={k++} note={note} noteLayout={note.pos} />)
    }
    if(note.underBarsPos) {
      for(const ub of note.underBarsPos) {
        const [x1, x2, y ] = ub 
        noteViews.push(<line key={k++} x1={x1} y1={y} x2={x2} y2={y} style={underBarStyle}/>)

      }
    }
    if(note.measurePos) {
      const [x, y, w, h] = note.measurePos
      noteViews.push(<line key={k++} x1={x+w} y1={y} x2={x+w} y2={y+h} style={underBarStyle}/>)
      noteViews.push(<MeasureID key={k++} note={note} sizeRatio={sizeRatio} />)
    }
    if(note.lineStart) {
      const [x, y, w, h] = note.measurePos
      noteViews.push(<line key={k++} x1={x} y1={y} x2={x} y2={y+h} style={underBarStyle}/>)
    }
    if(note.skipMeasures !== undefined) {
      noteViews.push(<SkipMeasures key={k++} note={note} sizeRatio={sizeRatio}/>)
    }
    if(note.apg) {
      noteViews.push(<Appoggiatura key={k++} 
        note={note} sizeRatio={sizeRatio}
      />)
    }
  }
  noteViews = noteViews.concat(<Slur    key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Tie     key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Triplet key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Clef    key={k++}
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<TimeSig key={k++}
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  return <svg width={cntWidth} height={cntHeight}>
    <g>
      {noteViews}
    </g>
  </svg>
}
export default Page