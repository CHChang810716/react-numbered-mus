import { curvePositionAnalysis } from "./curve-position-analysis"

const slurPositionAnalysis = (notes, sizeRatio) => {
  return curvePositionAnalysis(notes, sizeRatio, "slur")
}

export {slurPositionAnalysis}