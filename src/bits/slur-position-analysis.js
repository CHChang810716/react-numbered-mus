import React from 'react'
const bezierCurve = (x0, y0, x1, y1, sx0, sy0, sx1, sx1) => {
  return <path 
    d={`M${x0} ${y0} C ${sx0} ${sy0}, ${sx1} ${sy1}, ${x1} ${y1}`} 
    stroke="black"
    fill="transparent"
  />
}
const slurPositionAnalysis = (notes) => {
  let plot = []
  let index = {}
  let lineid = -1;
  for(let i = 0; i < notes.length; i ++) {
    const note = notes[i]
    if(note.lineStart) lineid ++;
    if(note.slur === undefined) continue
    const slur = note.slur
    if(slur.flag) {
      index[slur.id] = {
        start: note,
        line: lineid
      }
    } else {
      index[slur.id] = {
        end: note,
        line: lineid
      }
    }
  }
  
}

export {slurPositionAnalysis}