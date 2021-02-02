import React from 'react'

import { Note } from 'react-numbered-mus'
import 'react-numbered-mus/dist/index.css'

const App = () => {
  const [layout, NoteView] = Note({
    keyX: 100,
    keyY: 100, 
    sizeRatio: 10,
    octave: -2
  })
  return <div className="App">
    <svg>
      <NoteView 
        keyTxt={1} ascent={2} 
      />
    </svg> 
  </div>
}

export default App
