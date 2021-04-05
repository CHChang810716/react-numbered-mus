

const pageSpaceAnalysis = (notes, pageCntHeightSpace, spHSMapping = []) => {
  if(notes.length < 2) return [notes, []];
  let note = notes[0];
  let noteI = 0;
  let pageStart = note;
  let pageStartI = 0;
  let currHS = 0;
  let pageIndex = []
  let pageID = 0;
  while(note.lineStart !== undefined) { 
    // epsilon should not have lineStart
    const {heightSpace, next} = note.lineStart
    const tmpHS = currHS + heightSpace
    const HSLimit = spHSMapping[pageID] ? spHSMapping[pageID] : pageCntHeightSpace 
    if(tmpHS > HSLimit) {
      pageStart.pageStart = {
        next: noteI
      }
      pageIndex.push(pageStartI)
      pageID ++;
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
    pageID ++;
  }
  pageIndex.push(noteI)
  pageID ++;
  return [notes, pageIndex];
}

export default pageSpaceAnalysis