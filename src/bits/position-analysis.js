import {noteLayout, underBarLayout} from './note-utils'

const NOTE_SIZE_RATE_SEED = 0.005263

const underBarPositionAnalysis = (
  kr0, kr1, level, ntSizeRatio
) => {
  return underBarLayout(kr0, kr1, level, ntSizeRatio)
}
const measurePositionAnalysis = (
  startNoteI,
  notes,
  cntWidth,
  cntHeight,
  x,
  y,
  ntSizeRatio
) => {
  const startNote = notes[startNoteI]
  const endNoteI = startNote.measureStart.next
  let currX = x
  let ubStart = []
  const unitW = cntWidth / startNote.measureStart.totalSpace
  for(let noteI = startNoteI; 
    noteI < endNoteI;
    noteI ++
  ) {
    const note = notes[noteI]
    const width = unitW * note.measureSpace
    const nl = noteLayout(currX, y, width, cntHeight, ntSizeRatio, note.octave, note.underBar)
    const keyRect = nl[4]
    if(note.underBar) {
      if(note.underBar.flag) {
        const flags = note.underBar.flag
        for(let i = 0; i < flags.length; i ++) {
          if((flags[i] & 1) > 0) {
            ubStart[i] = keyRect;
          }
          if((flags[i] & 2) > 0) {
            if(note.underBarsPos=== undefined) {
              note.underBarsPos = []
            }
            note.underBarsPos[i] = underBarPositionAnalysis(
              ubStart[i], keyRect, i, ntSizeRatio
            ) 
          }
        }
      }
    }
    note.pos = nl
    currX += width;
  }
  return [x, y, cntWidth, cntHeight]
}
const linePositionAnalysis = (
  startNoteI,
  notes,
  cntWidth,
  cntHeight,
  x,
  y,
  ntSizeRatio
) => {
  const startNote = notes[startNoteI]
  if(startNote.epsilon) return null
  const endNoteI = startNote.lineStart.next;
  let totalXSpace = 0;
  for(let noteI = startNoteI; 
    noteI < endNoteI;
    noteI = notes[noteI].measureStart.next
  ) {
    const note = notes[noteI]
    totalXSpace += note.measureStart.totalSpace;
  }
  let currX = x;
  for(let noteI = startNoteI; 
    noteI < endNoteI;
    noteI = notes[noteI].measureStart.next
  ) {
    const note = notes[noteI]
    const width = cntWidth * (
      note.measureStart.totalSpace / totalXSpace
    )
    note.measurePos = measurePositionAnalysis(
      noteI,
      notes,
      width,
      cntHeight,
      currX, y,
      ntSizeRatio
    )
    currX += width;
  }
  return [x, y, cntWidth, cntHeight]
}
const pagePositionAnalysis = (
  notes, 
  startNoteI, 
  cntWidth,
  cntHeight
) => {
  if(notes[startNoteI].epsilon) return null
  const endNoteI = notes[startNoteI].pageStart.next;
  let totalYSpace = 0;
  for(let noteI = startNoteI; 
    noteI < endNoteI; 
    noteI = notes[noteI].lineStart.next
  ) {
    totalYSpace += notes[noteI].lineStart.heightSpace;
  }
  let currHeight = 0;
  for(let noteI = startNoteI; 
    noteI < endNoteI; 
    noteI = notes[noteI].lineStart.next
  ) {
    const note = notes[noteI]
    const height = cntHeight * (
      note.lineStart.heightSpace / totalYSpace
    )
    note.linePos = linePositionAnalysis(
      noteI, notes,
      cntWidth, height,
      0, currHeight,
      cntWidth * NOTE_SIZE_RATE_SEED
    )
    currHeight += height
  }
}
export {pagePositionAnalysis}