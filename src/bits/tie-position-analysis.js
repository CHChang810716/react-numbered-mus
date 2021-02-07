import { curvePositionAnalysis } from "./curve-position-analysis"

const tiePositionAnalysis = (notes, sizeRatio) => {
  return curvePositionAnalysis(notes, sizeRatio, "tie")
}

export  {tiePositionAnalysis}