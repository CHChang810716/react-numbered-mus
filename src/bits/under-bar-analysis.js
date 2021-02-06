/**
 * note = {
 *  underBar: {
 *    num: <n>
 *    flag: [<true|false>...]
 *  }
 * }
 */
const underBarAnalysis = (notes) => {
  // FIXME: algorithm refine
  let lastUnderBarNum = 0;
  let lastNote = null;
  for(const note of notes) {
    const underBarNum = Math.floor(note.noteType / 8);
    if(underBarNum > 0) {
      note.underBar = {
        num: underBarNum,
        flag: []
      }
    }
    if(underBarNum > lastUnderBarNum) {
      for(let i = lastUnderBarNum; i < underBarNum; i ++) {
        note.underBar.flag[i] = 1;
      }
    }
    if(underBarNum < lastUnderBarNum) {
      for(let i = underBarNum; i < lastUnderBarNum; i ++) {
        if(lastNote.underBar.flag[i] === undefined) {
          lastNote.underBar.flag[i] = 0;
        }
        lastNote.underBar.flag[i] |= 2;
        // note.underBar.flag[i] = 1;
      }
    }
    lastUnderBarNum = underBarNum;
    lastNote = note;
  }
  return notes;
}
export default underBarAnalysis