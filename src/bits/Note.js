import React from 'react'
import {rectUnion} from './utils'

const KEY_ASCENT_SIGN = ['\u266D', '\u266F', '']
const FONT_SIZE_SEED                =  5     ;
const FONT_HEIGHT_SEED              = FONT_SIZE_SEED * 0.713 ;
const FONT_WIDTH_SEED               = FONT_SIZE_SEED * 0.54  ;
const OCTAVE_DOT_SP_SEED            =  1.0   ; // THE SPACE BETween dot
const OCTAVE_DOT_R_SEED             = FONT_SIZE_SEED * 0.07  ;
const OCTAVE_DOT_X_SEED             =  1.4   ;
const FIRST_UP_OCTAVE_DOT_Y_SEED    = -4.7   ;
const FIRST_DOWN_OCTAVE_DOT_Y_SEED  =  1.0   ;
const ASCENT_SIZE_SEED              =  3.5   ;
const ASCENT_HEIGHT_SEED            = ASCENT_SIZE_SEED * 0.713;
const ASCENT_WIDTH_SEED             = ASCENT_SIZE_SEED * 0.54;
const ASCENT_X_SEED                 = -1.7  ;
const ASCENT_Y_SEED                 = -1.9  ;

const Note = ({
  keyX, keyY,
  // octave,
  sizeRatio
}) => {
  const fontSize            = FONT_SIZE_SEED    * sizeRatio;
  const fontHeight          = FONT_HEIGHT_SEED  * sizeRatio;
  const fontWidth           = FONT_WIDTH_SEED   * sizeRatio;
  // const octaveDotX          = keyX + (OCTAVE_DOT_X_SEED * sizeRatio);
  // const octaveDotR          = OCTAVE_DOT_R_SEED * sizeRatio;
  // const firstUpOctaveDotY   = keyY + (FIRST_UP_OCTAVE_DOT_Y_SEED * sizeRatio);
  // const firstDownOctaveDotY = keyY + (FIRST_DOWN_OCTAVE_DOT_Y_SEED * sizeRatio);
  const ascentSize          = sizeRatio * ASCENT_SIZE_SEED;
  const ascentX             = keyX + (sizeRatio * ASCENT_X_SEED);
  const ascentY             = keyY + (sizeRatio * ASCENT_Y_SEED);
  const ascentHeight        = sizeRatio * ASCENT_HEIGHT_SEED;
  const ascentWidth         = sizeRatio * ASCENT_WIDTH_SEED ;
  // const octaveDotSp         = sizeRatio * OCTAVE_DOT_SP_SEED;
  // const octaveDotYs = [];
  // if ( octave > 0 ) {
  //   for ( let i = 0; i < octave; i ++ ){
  //     octaveDotYs.push(firstUpOctaveDotY - ( octaveDotSp * i ))
  //   }
  // } else if ( octave < 0 ) {
  //   for ( let i = 0; i > octave; i -- ){
  //     octaveDotYs.push(firstDownOctaveDotY - ( octaveDotSp * i )) // !!! i is negtive
  //   }
  // } else {}
  const keyRect = { 
    x: keyX,
    y: keyY - fontHeight,
    width:  fontWidth,
    height: fontHeight
  }
  const ascentRect = {
    x: ascentX,
    y: ascentY - ascentHeight,
    width:  ascentWidth,
    height: ascentHeight
  }
  // const octaveDotsRect = {
  //   x: ascentX,
  //   y: ascentY - ascentHeight,
  //   width:  ascentWidth,
  //   height: ascentHeight
  // }
  const noteRect = rectUnion([
    keyRect, ascentRect, 
    // octaveDotsRect
  ])
  const layout = {
    keyRect: keyRect,
    ascentRect: ascentRect,
    // octaveDotsRect: octaveDotsRect,
    rect: noteRect
  }
  const view = ({keyTxt, ascent}) => {
    return (
      <g className="Note">
        {  
          // octaveDotYs.map(
          //   (y, i) => <circle fill="black" r={octaveDotR} transform={
          //     `translate(${octaveDotX},${y})`
          //   } key={i}/>
          // )
        }
        <text 
          transform={ `translate(${keyX},${keyX})`} 
          fontSize={fontSize}
        >
          { keyTxt }
        </text>
        <text fontSize={ascentSize} transform={
            `translate(${ascentX}, ${ascentY})`
          }> { 
            KEY_ASCENT_SIGN[ascent] 
          } 
        </text>
      </g>
    )
  }
  return [layout, view]
}
export default Note;