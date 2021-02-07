import React from "react";
import { ascentSign } from "../bits/note-utils";
import { svgDbg } from "../bits/utils";

// const DEBUG_PAD = 7;
const Note = ({note, noteLayout}) => {
  const {keyX, keyY, ascentX, ascentY, 
    keyRect, ascentRect,
    octaveDotX, octaveDotYs, octaveDotR
   } = noteLayout
  // const debug = null;
  const debug = <rect
      x={keyRect.x} y={keyRect.y}
      width={keyRect.width}
      height={keyRect.height}
      style={svgDbg}
  />
  return <g>
    {debug}
    {  
      octaveDotYs.map(
        (y, i) => <circle fill="black" 
          r={octaveDotR} cx={octaveDotX} cy={y} key={i}/>
      )
    }
    <text 
      x={keyX} y={keyY}
      fontSize={keyRect.fsize}
    >
      { note.keyTxt }
    </text>
    <text fontSize={ascentRect.fsize} x={ascentX} y={ascentY}> 
      { 
        ascentSign(note.ascent)
      } 
    </text>
  </g>
}
export default Note