const pageSpaceAnalysis = (notes, pageCntHeightSpace) => {
  if(notes.length < 2) return null;
  let note = notes[0];
  let noteI = 0;
  let pageStart = note;
  let currHS = 0;
  while(note.epsilon === undefined) {
    const {heightSpace, nextLineNoteI} = note.lineStart
    const tmpHS = currHS + heightSpace
    if(tmpHS > pageCntHeightSpace) {
      pageStart.pageStart = {
        nextPageStart: noteI
      }
      currHS = heightSpace;
    } else {
      currHS = tmpHS;
    }
    noteI = nextLineNoteI
    note = notes[noteI]
  }

}