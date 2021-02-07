import React from 'react'
import {Score} from 'react-numbered-mus'
const measureStart = (keyTxt, nt, octave) => {
  return {
    keyTxt: keyTxt, noteType: nt, measureStart: true, 
    octave: octave
  }
}
const normalNote = (keyTxt, nt, octave) => {
  return {
    keyTxt: keyTxt, noteType: nt, 
    octave: octave
  }
}
const score = {
  notes: [
    Object.assign({
      slur: {
        flag: true,
        id: 0
      }
    }, measureStart(1, 2)),
    normalNote(1, 8, -2),
    normalNote(1, 8, -2),
    Object.assign({
      ascent: 1
    }, normalNote(1, 16, -2)),
    normalNote(2, 16, -2),
    normalNote(3, 16, -2),
    normalNote(4, 16, -2),
    Object.assign({
      slur: {
        flag: false,
        id: 0
      }
    }, measureStart(1, 4, 2)),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4)
  ]
}
const App = () => {
  return <div className="App">
    <Score 
      score={score}
      maxMeasureNumInLine={4}
      minLineHeight={75}
      pageCntWidth={950}
      pageCntHeight={600}
      yRate={1}
      xRate={170}
    />
  </div>
}

export default App
