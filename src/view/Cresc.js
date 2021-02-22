import { crescDimPositionAnalysis } from "../bits/cresc-dim-position-analysis"

const Cresc = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const iter = crescDimPositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, "cresc")
  const res = []
  let elem = iter.next()
  while(!elem.done) {
    res.push(elem.value)
    elem = iter.next()
  }
  return res;
}

export default Cresc