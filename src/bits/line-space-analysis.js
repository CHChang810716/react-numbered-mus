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
  lineSpaceLimit
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
    if(tmpLS <= lineSpaceLimit) {
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
  baseLineHeightSpace
) => {
  let lastNi = lineIndex[0];
  for(let i = 1; i < lineIndex.length; i++) {
    const ni = lineIndex[i]
    const lineStart = notes[lastNi].lineStart
    let maxTHS = 0; // for section id
    let maxBHS = 0;
    for(let j = lastNi; j < ni; j ++) {
      let currTHS = 0;
      let currBHS = 0;
      const note = notes[j]
      if(note.octave > 2) {
        currTHS += ((note.octave - 2) / 2)
      }
      if(note.slur || note.tie) {
        currTHS += 4
      }
      if(note.tempoPerMeasure || note.baseTune || note.speed) {
        currTHS = Math.max(8, currTHS)
      }
      maxTHS = Math.max(maxTHS, currTHS)
      maxBHS = Math.max(maxBHS, currBHS)
    }
    lineStart.heightSpace = baseLineHeightSpace + maxTHS + maxBHS
    lineStart.heightTS = maxTHS
    lineStart.heightBS = maxBHS
    lastNi = ni;
  }
  // for(const ni of lineIndex) {
  //   const note = notes[ni]
  //   if(note.epsilon) continue
  //   note.lineStart.heightSpace = baseLineHeightSpace
  // }
  for(const ni of lineIndex) {
    const note = notes[ni]
    if(note.epsilon) continue
    if(note.lineStart.heightSpace === undefined) {
      console.warn("bug....")
    }
  }
  return notes;
}
const lineSpaceAnalysis = (
  notes, measureIndex,
  lineSpaceLimit,
  baseLineHeightSpace
) => {
  const [_0, lineIndex] = lineXSpaceAnalysis(notes, measureIndex, lineSpaceLimit);
  const _1 = lineYSpaceAnalysis(_0, lineIndex, baseLineHeightSpace);
  return [_1, lineIndex]
}
export default lineSpaceAnalysis