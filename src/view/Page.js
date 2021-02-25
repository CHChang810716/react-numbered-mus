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
import Speed from './Speed'
import { TL2Label, TL2_LABLE_WIDTH_SEEDS } from './TL2Label'
import Cresc from './Cresc'
import Dim from './Dim'
import { BL2Label, BL2_LABLE_WIDTH_SEEDS } from './BL2Label'
import { LoopBegin, LoopEnd } from './Loop'
import { Stacc } from './Stacc'
import { Marcato } from './Marcato'

const Page = ({
  notes, 
  startNoteI, 
  x, y,
  cntWidth,
  cntHeight,
  sizeRatio
}) => {
  if(notes[startNoteI].epsilon) return null
  pagePositionAnalysis(notes, startNoteI, x, y, cntWidth, cntHeight, sizeRatio)
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
        if(ub===undefined) continue
        const [x1, x2, y ] = ub 
        noteViews.push(<line key={k++} x1={x1} y1={y} x2={x2} y2={y} style={underBarStyle}/>)

      }
    }
    if(note.measurePos) {
      const [x, y, w, h] = note.measurePos
      noteViews.push(<line key={k++} x1={x+w} y1={y} x2={x+w} y2={y+h} style={underBarStyle}/>)
      noteViews.push(<MeasureID key={k++} note={note} sizeRatio={sizeRatio} />)
      if(note.loopBegin) {
        noteViews.push(<LoopBegin x={x} y={y} w={w} h={h} sizeRatio={sizeRatio}/>)
      }
      if(note.loopEnd) {
        noteViews.push(<LoopEnd x={x} y={y} w={w} h={h} sizeRatio={sizeRatio}/>)
      }
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
  noteViews = noteViews.concat(<Speed   key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  for(const label in TL2_LABLE_WIDTH_SEEDS) {
    noteViews = noteViews.concat(<TL2Label   key={k++} 
      notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
      sizeRatio={sizeRatio} ntProp={label}
    />)
  }
  for(const label in BL2_LABLE_WIDTH_SEEDS) {
    noteViews = noteViews.concat(<BL2Label   key={k++} 
      notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
      sizeRatio={sizeRatio} ntProp={label}
    />)
  }
  
  noteViews = noteViews.concat(<Cresc  key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Dim  key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Stacc  key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  noteViews = noteViews.concat(<Marcato  key={k++} 
    notes={notes} startNoteI={startNoteI} endNoteI={endNoteI} 
    sizeRatio={sizeRatio} 
  />)
  return     <g>
      {noteViews}
    </g>
}
export default Page