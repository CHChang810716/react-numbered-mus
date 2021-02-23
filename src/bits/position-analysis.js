import {noteLayout, underBarLayout} from './note-utils'

const LINE_HEIGHT_SEED = 13;
const MEASURE_X_PADDING_SEED = 2.3;
/**
 * note.pos = <defined in note-utils>
 */
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
  const xPadding = ntSizeRatio * MEASURE_X_PADDING_SEED;
  const innerWidth = cntWidth - (2 * xPadding);
  let currX = x + xPadding;
  let ubStart = []
  const unitW = innerWidth / startNote.measureStart.totalSpace
  for(let noteI = startNoteI; 
    noteI < endNoteI;
    noteI ++
  ) {
    const note = notes[noteI]
    const width = unitW * note.measureSpace
    const nl = noteLayout(
      currX, y, 
      width, cntHeight, 
      ntSizeRatio, 
      note.octave, note.underBar,
      note.noteType, note.halfPoint
    )
    const keyRect = nl.keyRect
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
    note.tl2Pos = {
      x: 0
    }
    note.bl2Pos = {
      x: 0
    }
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
    note.measureNot = {
      x: 0
    }
    currX += width;
  }
  return [x, y, cntWidth, cntHeight]
}
const pagePositionAnalysis = (
  notes, 
  startNoteI, 
  x, y,
  cntWidth,
  cntHeight,
  sizeRatio
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
  const innerHeight = sizeRatio * LINE_HEIGHT_SEED;
  const maxHeight = innerHeight * 2.5;
  // const xPadding = sizeRatio * LINE_X_PADDING_SEED;
  let currHeight = y;
  for(let noteI = startNoteI; 
    noteI < endNoteI; 
    noteI = notes[noteI].lineStart.next
  ) {
    const note = notes[noteI]
    const height = Math.min(cntHeight * (
      note.lineStart.heightSpace / totalYSpace
    ), maxHeight)
    const yOffset = (height - innerHeight) / 2;
    note.linePos = linePositionAnalysis(
      noteI, notes,
      cntWidth, innerHeight,
      x, currHeight + yOffset,
      sizeRatio
    )
    currHeight += height
  }
}
export {pagePositionAnalysis}