import React from 'react'
import {Score} from 'react-numbered-mus'
import 'react-numbered-mus/dist/index.css'
const measureStart = (keyTxt, nt) => {
  return {
    keyTxt: keyTxt, noteType: nt, measureStart: true
  }
}
const normalNote = (keyTxt, nt) => {
  return {
    keyTxt: keyTxt, noteType: nt
  }
}
const score = {
  notes: [
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
      minLineHeight={150}
      pageCntWidth={700}
      pageCntHeight={1200}
      yRate={1}
      xRate={1}
    />
  </div>
}

export default App
