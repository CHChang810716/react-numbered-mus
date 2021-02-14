import { curvePositionAnalysis } from "../bits/curve-position-analysis"

const Slur = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const curveIter = curvePositionAnalysis(notes, startNoteI, endNoteI, sizeRatio, "slur")
  const res = []
  let elem = curveIter.next()
  while(!elem.done) {
    res.push(elem.value)
    elem = curveIter.next()
  }
  return res;
}

export default Slur