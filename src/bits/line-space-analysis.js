/**
 * dependent:
 *  measureSpaceAnalysis
 * 
 * line begin note = {
 *  existing props...
 *  lineStart: {
 *    measureNum: <n>,
 * 
 *    totalSpace: <n>,
 *    totalNotes: <n>
 *  }
 * }
 * 
 * line index = [<line start note id>...]
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
    // if note.measureStart not exist, the note is epsilon
    if(!note.measureStart) {
      currLineStartNote.lineStart = {
        measureNum: currMeasureNum
      }
      lineIndex.push(ni)
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
        measureNum: currMeasureNum
      }
      currLineStartNote = note
      lineIndex.push(ni)
      currMeasureNum = 1;
      currLineSpace = note.measureStart.totalSpace
    }
  }
  return [notes, lineIndex]
}
const lineSpaceAnalysis = () => {

}