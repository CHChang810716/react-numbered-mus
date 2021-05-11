import React from 'react'
import { NOTE_FERMATA_Y_SHIFT_SEED } from '../bits/note-utils';
import { rectUnion } from '../bits/utils';

const FERMATA_SIZE_SEED = 0.2;

const BasicFermata = ({x, y, scale}) => {
  const _scale = scale * 0.031;
  return <g transform={`matrix(${_scale},0,0,${_scale},${(-248.42597 * _scale) + x},${(-210.2665 * _scale) + y})`}>
    <path 
      d="M 290,457.36218 C 290,471.1693 281.04569,482.36218 270,482.36218 C 258.95431,482.36218 250,471.1693 250,457.36218 C 250,443.55506 258.95431,432.36218 270,432.36218 C 281.04569,432.36218 290,443.55506 290,457.36218 L 290,457.36218 z " 
      transform="matrix(2.375,0,0,1.9,-391.25,-445.376)" 
      style={{
        opacity:          1,
        fill:             "black",
        fillOpacity:      1,
        fillRule:         "evenodd",
        stroke:           "none",
        strokeWidth:      0.559017,
        strokeLinecap:    "round",
        strokeLinejoin:   "bevel", 
        strokeMiterlimit: 4, 
        strokeDasharray:  "none",
        strokeOpacity:    1
      }}
    />
    <path 
      d="M 15,467.36218 C 35,332.36218 130,212.36218 250,212.36218 C 370,212.36218 465,332.36218 485,467.36218 C 486,472.36218 461,472.36218 460,467.36218 C 435,372.36218 370,282.36218 250,282.36218 C 130,282.36218 65,372.36218 40,467.36218 C 39,472.36218 14,472.36218 15,467.36218 z "
      style={{fill: "black"}}
    />
  </g>
}
const Fermata = ({notes, startNoteI, endNoteI, sizeRatio}) => {
  const res = []
  let k = 0;
  for(let i = startNoteI; i < endNoteI; i ++) {
    const note = notes[i]
    if(note.fermata === undefined) continue;
    const kr = rectUnion([note.pos.keyRect, note.pos.octaveDotsRect]);
    const x           = kr.x + (kr.width / 2)
    const y           = kr.y + (NOTE_FERMATA_Y_SHIFT_SEED * sizeRatio);
    const fermataSize = FERMATA_SIZE_SEED * sizeRatio;
    res.push(<BasicFermata key={k++} x={x} y={y} scale={fermataSize}/>)
  }
  return res
}

export {BasicFermata, Fermata}