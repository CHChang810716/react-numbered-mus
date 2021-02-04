/**
 * dependent:
 *  measureSpaceAnalysis
 * 
 * line begin note = {
 *  existing props...
 *  lineStart: {
 *    measureNum: <n>,
 *    heightSpace: <n>,
 *    next: <n>,
 * 
 *    totalSpace: <n>,
 *    totalNotes: <n>
 *  }
 * }
 * 
 * line index = [<line start note id>..., <epsilon note id>]
 */
const lineXSpaceAnalysis = (
  notes, measureIndex,  // the last measure is epsilon
  lineSpaceLimit,
  maxMeasureNumInLine
) => {
  let currMeasureNum = 0;
  let currLineSpace = 0;
  let currLineStartNote = null;
  let lineIndex = []
  for(const ni of measureIndex) {
    const note = notes[ni];
    if(currLineStartNote === null) {
      currLineStartNote = note;
      lineIndex.push(ni)
    }
    if(note.epsilon) {
      currLineStartNote.lineStart = {
        measureNum: currMeasureNum,
        next: ni
      }
      lineIndex.push(ni)
      break;
    }
    const tmpMN = currMeasureNum + 1;
    const tmpLS = currLineSpace + note.measureStart.totalSpace;
    if(
      tmpMN < maxMeasureNumInLine && 
      tmpLS < lineSpaceLimit
    ) {
      currMeasureNum = tmpMN;
      currLineSpace = tmpLS;
    } else {
      if(currMeasureNum === 0) {
        throw new Error("line space or max measure number limit too small")
      }
      currLineStartNote.lineStart = {
        measureNum: currMeasureNum,
        next: ni
      }
      currLineStartNote = note
      lineIndex.push(ni)
      currMeasureNum = 1;
      currLineSpace = note.measureStart.totalSpace
    }
  }
  return [notes, lineIndex]
}
const lineYSpaceAnalysis = (
  notes,
  lineIndex,
  minLineHeight
) => {
  for(const ni of lineIndex) {
    const note = notes[ni]
    if(!note.epsilon) {
      note.lineStart.heightSpace = minLineHeight
    }
  }
  return notes;
}
const lineSpaceAnalysis = (
  notes, measureIndex,
  lineSpaceLimit,
  maxMeasureNumInLine,
  minLineHeight
) => {
  const [_0, lineIndex] = lineXSpaceAnalysis(notes, measureIndex, lineSpaceLimit, maxMeasureNumInLine);
  const _1 = lineYSpaceAnalysis(_0, lineIndex, minLineHeight);
  return [_1, lineIndex]
}
export default lineSpaceAnalysis