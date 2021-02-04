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
  let underBar = [false, false, false, false, false, false]
  // let lastNote = null;
  let lastUnderBarNum = 0;
  for(const note of notes) {
    if(note.measureStart) {
      for(let i in underBar) {
        if(underBar[i]) {
          note.underBar.flag[i] = false;
          underBar[i] = false;
        }
      }
    }
    const underBarNum = Math.floor(note.noteType / 8);
    note.underBar.num = underBarNum
    if(lastUnderBarNum < underBarNum) {
      for(let i = underBarNum; i > lastUnderBarNum; i--) {
        note.underBar.flag[i - 1] = true;
        underBar[i - 1] = true;
      }
    } else if(lastUnderBarNum > underBarNum) {
      for(let i = underBarNum; i < lastUnderBarNum; i++) {
        note.underBar.flag[i - 1] = false;
        underBar[i - 1] = false;
      }
    }
    // lastNote = note;
    lastUnderBarNum = underBarNum;
  }
  return notes;
}
export default underBarAnalysis