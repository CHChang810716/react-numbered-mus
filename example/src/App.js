import React from 'react';
import {NumStaffScore} from 'react-numbered-mus'
const score = {
  notes: [
    {
      "keyTxt": 1,
      "noteType": 4,
      "measureStart": true,
      "tempoPerMeasure": 4,
      "noteTypePerTempo": 4,
      "speed": 80,
      "tuneAscent": {   // 2 sharp = D
        "sign": 1,      // 0 = flat(♭), 1 = sharp(#)
        "num": 1        // how many sign (1 sharp = G, 2 sharp = D, 3 sharp = A etc.)
      }
    },
    {
      "keyTxt": 2,
      "noteType": 4
    },
    {
      "keyTxt": 3,
      "noteType": 4
    },
    {
      "keyTxt": 4,
      "noteType": 4
    },
    {
      "keyTxt": 5,
      "noteType": 4,
      "measureStart": true
    },
    {
      "keyTxt": 6,
      "noteType": 4
    },
    {
      "keyTxt": 7,
      "noteType": 4
    },
    {
      "keyTxt": 1,
      "noteType": 4,
      "octave": 1
    },
    {
      "keyTxt": 2,
      "noteType": 4,
      "measureStart": true,
      "octave": 1
    },
    {
      "keyTxt": 3,
      "noteType": 4,
      "octave": 1
    },
    {
      "keyTxt": 4,
      "noteType": 4,
      "octave": 1
    },
    {
      "keyTxt": 5,
      "noteType": 4,
      "octave": 1
    },
    {
      "keyTxt": 6,
      "noteType": 4,
      "measureStart": true,
      "octave": 1
    },
    {
      "keyTxt": 7,
      "noteType": 4,
      "octave": 1
    },
    {
      "keyTxt": 1,
      "noteType": 4,
      "octave": 2
    },
    {
      "keyTxt": 2,
      "noteType": 4,
      "octave": 2
    }
  ]
}
const App = () => {
  return <div className="App">
    <NumStaffScore 
      score={score}
      pageWidth={(210 - 10)*5}
      pageHeight={(297 - 10)*5}
      maxLineWeight={7.81}
      size={5} 
      renderHeader={false}
      renderPageID={true}
    />
  </div>
}

export default App

