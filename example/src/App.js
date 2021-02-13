import React from 'react'
import {Score} from 'react-numbered-mus'
const measureStart = (keyTxt, nt, octave, optional) => {
  return Object.assign(normalNote(keyTxt, nt, octave, {
    measureStart: true
  }), optional)
}
const normalNote = (keyTxt, nt, octave, optional) => {
  return Object.assign({
    keyTxt: keyTxt, 
    noteType: nt, 
    octave: octave
  }, optional)
}
const score = {
  notes: [
    measureStart(1, 2, 0, {
      slur: [0, 2]
    }),
    normalNote(1, 8, -2),
    normalNote(1, 8, -2),
    normalNote(1, 16, -2, {
      ascent: 1
    }),
    normalNote(2, 16, -2),
    normalNote(3, 16, -2),
    normalNote(4, 16, -2),
    measureStart(1, 4, 2,{
      slur: [0]
    }),
    normalNote(1, 4, 2, {
      slur: [2]
    }),
    normalNote(1, 4, 0, {
      apg: [{
        keyTxt: 2,
        octave: 1,
        ascent: 0
      }
    ]
    }),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 1),
    measureStart(1, 4),
    normalNote(1, 12, 0, {
      triplet: [3]
    }),
    normalNote(1, 12),
    normalNote(1, 12, 0, {
      triplet: [3]
    }),
    normalNote(1, 12),
    normalNote(1, 12),
    normalNote(1, 12),
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
    normalNote(1, 4, 0, {
      tie: [1]
    }),
    measureStart(1, 4, 0, {
      tie: [1] 
    }),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4, 0),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    measureStart(1, 4, 0),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4, 0),
    {
      skipMeasures: 10,
      measureStart: true
    },
    measureStart(1, 4),
    normalNote(1, 4),
    normalNote(1, 4),
    normalNote(1, 4, 0),
  ]
}
const App = () => {
  return <div className="App">
    <Score 
      score={score}
      maxMeasureNumInLine={4}
      minLineHeight={75}
      pageCntWidth={950}
      pageCntHeight={670}
      yRate={1}
      xRate={170}
    />
  </div>
}

export default App
