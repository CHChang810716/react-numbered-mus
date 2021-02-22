import { crescDimPositionAnalysis } from "../bits/cresc-dim-position-analysis"

const Dim = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const iter = crescDimPositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, "dim")
  const res = []
  let elem = iter.next()
  while(!elem.done) {
    res.push(elem.value)
    elem = iter.next()
  }
  return res;
}

export default Dim