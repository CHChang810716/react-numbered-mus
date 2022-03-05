# react-numbered-mus

> Numbered musical notation, JianPu

[![NPM](https://img.shields.io/npm/v/react-numbered-mus.svg)](https://www.npmjs.com/package/react-numbered-mus) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install (Not yet ready)

```bash
npm install --save react-numbered-mus
```

## Usage

```jsx
import React from 'react'
import {Score} from 'react-numbered-mus'
const measureStart = (keyTxt, nt, octave, optional) => {
  return Object.assign(note(keyTxt, nt, octave, {
    measureStart: true
  }), optional)
}
const note = (keyTxt, nt, octave, optional) => {
  return Object.assign({
    keyTxt: keyTxt, 
    noteType: nt, 
    octave: octave
  }, optional)
}
const score = {
  notes: [
    measureStart(1, 2, 0, {
      slur: [0, 2],
      baseTune: 'D',
      tempoPerMeasure: 4,
      noteTypePerTempo: 4,
      speed: 80
    }),
    note(1, 8, -2),
    note(1, 8, -2),
    note(1, 16, -2, {
      ascent: 1
    }),
    note(2, 16, -2),
    note(3, 16, -2),
    note(4, 16, -2),
    measureStart(1, 4, 2,{
      slur: [0]
    }),
    note(4, 4, 2, {
      slur: [2]
    }),
    note(3, 4, 0, {
      apg: [measureStart(2, 8,{
        ascent: 0
      })]
    }),
    note(1, 4),
    measureStart(6, 4),
    note(7, 12, 0, {
      triplet: [3]
    }),
    note(1, 12),
    note(3, 12, 0, {
      triplet: [3]
    }),
    note(5, 12),
    note(7, 12),
    note(2, 12),
    note(4, 4),
    measureStart(6, 4),
    note(7, 4),
    note(2, 4),
    note(3, 4),
    measureStart(5, 4),
    note(6, 4),
    note(7, 4),
    note(3, 4),
    measureStart(2, 4),
    note(4, 4),
    note(1, 4),
    note(1, 4),
    measureStart(1, 4),
    note(3, 4),
    note(2, 4),
    note(1, 4, 0, {
      tie: [1]
    }),
    measureStart(1, 4, 0, {
      tie: [1] 
    }),
    note(7, 4),
    note(2, 4),
    note(1, 4, 0),
    {
      skipMeasures: 10,
      measureStart: true
    },
  ]
}
const App = () => {
  return <div className="App">
    <Score 
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
```

## Result

![example](./example/example.svg)

## License

MIT © [CHChang810716](https://github.com/CHChang810716)
