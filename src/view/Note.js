import React from "react";
import { ascentSign, underBarStyle } from "../bits/note-utils";
import { svgDbg } from "../bits/utils";

// const DEBUG_PAD = 7;
const Note = ({note, noteLayout}) => {
  const { 
    noteRect, outRect,
    keyX, keyY, keyRect, 
    ascentX, ascentY, ascentRect, 
    octaveDotX, octaveDotYs, octaveDotR, octaveDotsRect,
    extDashXs, extDashY, extDash, 
    halfPointXs, halfPointY, halfPointR,
    segs
  } = noteLayout
  let debug = null;
  let debug2 = null;
  let debug3 = []
  // debug = <rect
  //     x={keyRect.x} y={keyRect.y}
  //     width={keyRect.width}
  //     height={keyRect.height}
  //     style={svgDbg}
  // />
  // debug = <rect
  //     x={noteRect.x} y={noteRect.y}
  //     width={noteRect.width}
  //     height={noteRect.height}
  //     style={svgDbg}
  // />
  // debug2 = <rect
  //     x={outRect.x} y={outRect.y}
  //     width={outRect.width}
  //     height={outRect.height}
  //     style={svgDbg}
  // />
  // if(segs.length > 0) {
  //   for(let i = 0; i < segs.length && i < 500; i += 1) {
  //     const segSize = segs[i]
  //     // if(note.halfPoint > 0) {
  //     //   console.log(segSize)
  //     // }
  //     debug3.push(
  //       <line key={i}
  //         x1={outRect.x + (segSize)} 
  //         y1={outRect.y + 10} 
  //         x2={outRect.x + (segSize)} 
  //         y2={outRect.y + outRect.height - 10} style={svgDbg}/>
  //     )
  //   }
  // } else {
  //   console.log(segs)
  // }
  return <g>
    {debug}
    {debug2}
    {debug3}
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
    {
      extDashXs.map((x, k) => <line 
        key={k}
        x1={x}            y1={extDashY}
        x2={x + extDash}  y2={extDashY}
        style={underBarStyle}
      />)
    }
    {
      halfPointXs.map((x, k) => <circle
        key={k}
        fill="black"
        r={halfPointR}
        cx={x} cy={halfPointY}
      />)
    }
  </g>
}
export default Note