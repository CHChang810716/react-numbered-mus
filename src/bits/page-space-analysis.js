

const pageSpaceAnalysis = (notes, pageCntHeightSpace) => {
  if(notes.length < 2) return [notes, []];
  let note = notes[0];
  let noteI = 0;
  let pageStart = note;
  let pageStartI = 0;
  let currHS = 0;
  let pageIndex = []
  while(note.lineStart !== undefined) { 
    // epsilon should not have lineStart
    const {heightSpace, next} = note.lineStart
    const tmpHS = currHS + heightSpace
    if(tmpHS > pageCntHeightSpace) {
      pageStart.pageStart = {
        next: noteI
      }
      pageIndex.push(pageStartI)
      pageStart = note;
      pageStartI = noteI;
      currHS = heightSpace;
    } else {
      currHS = tmpHS;
    }
    noteI = next
    note = notes[noteI]
  }
  if(!pageStart.epsilon) {
    pageStart.pageStart = {
      next: noteI
    }
    pageIndex.push(pageStartI)
  }
  pageIndex.push(noteI)
  return [notes, pageIndex];
}

export default pageSpaceAnalysis