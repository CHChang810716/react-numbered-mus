import {rectUnion} from './utils'
const KEY_ASCENT_SIGN = ['\u266D', '\u266F', '\u266E'] // b, #, recover
const FONT_SIZE_SEED                = 3.5     ;
const FONT_HEIGHT_SEED              = FONT_SIZE_SEED * 0.713 ;
const FONT_WIDTH_SEED               = FONT_SIZE_SEED * 0.54  ;
const OCTAVE_DOT_SP_SEED            =  1.0   ; // THE SPACE BETween dot
const OCTAVE_DOT_R_SEED             = FONT_SIZE_SEED * 0.07  ;
const OCTAVE_DOT_X_SEED             = FONT_SIZE_SEED * 0.28  ;
const FIRST_UP_OCTAVE_DOT_Y_SEED    = -3.6   ;
const FIRST_DOWN_OCTAVE_DOT_Y_SEED  =  1.0   ;
const ASCENT_SIZE_SEED              =  3.2   ;
const ASCENT_HEIGHT_SEED            = ASCENT_SIZE_SEED * 0.713;
const ASCENT_WIDTH_SEED             = ASCENT_SIZE_SEED * 0.54;
const ASCENT_X_SEED                 = -1.25 ;
const ASCENT_Y_SEED                 = -2.1  ;
const EXT_DASH_SEED                 =  3  ;
const EXT_DASH_Y_SEED               =  -(FONT_HEIGHT_SEED / 2)  ;
const EXT_DASH_SP_SEED              =  2.3  ;
const HALF_POINT_R_SEED             = FONT_SIZE_SEED * 0.06  

const MEASURE_NOTATION_X_SEED       = -3;
const MEASURE_NOTATION_Y_SEED       = -6.3;
const MEASURE_NOTATION_FSIZE_SEED   = 3.7;

const NOTE_TOP_L2_Y_SEED            = -7;
const NOTE_TOP_L2_X_SEED            = -3;
const NOTE_BTN_L2_Y_SEED            =  6.5;
const NOTE_BTN_L2_X_SEED            = -2;
const STACC_Y_SEED                  = -4.7;
const MARCATO_Y_SEED                = -4.7;

const extAnalysis = (noteType) => {
  switch(noteType) {
    case 1: return 3;
    case 2: return 1;
    default: return 0;
  }
}

const underBarLayout = (
  kr0, kr1, level, ntSizeRatio
) => {
  const space = ntSizeRatio * 1;
  const x0 = kr0.x;
  const x1 = kr1.x + kr1.width;
  const y = kr0.y + kr0.height + (space * (level + 1))
  return [x0, x1, y]
}

const noteLayout = (
  x, y, noteWidth, noteHeight, 
  sizeRatio, octave, underBar, 
  noteType, halfPoint
) => {
  if(halfPoint === undefined) halfPoint = 0;

  let   keyX = x + (noteWidth / 2) - (1 * sizeRatio);
  const keyY = y + (noteHeight / 2) + (1 * sizeRatio);

  const fontSize            = FONT_SIZE_SEED    * sizeRatio;
  const fontHeight          = FONT_HEIGHT_SEED  * sizeRatio;
  const fontWidth           = FONT_WIDTH_SEED   * sizeRatio;

  const keyRect = { 
    x: keyX,
    y: keyY - fontHeight,
    width:  fontWidth,
    height: fontHeight,
    fsize: fontSize
  }
  
  const underBarNum = underBar ? underBar.num : 0;
  const [_0, _1, underBarY] = underBarLayout(keyRect, keyRect, underBarNum - 1, sizeRatio)

  let   octaveDotX          = keyX + (OCTAVE_DOT_X_SEED * sizeRatio);
  const octaveDotR          = OCTAVE_DOT_R_SEED * sizeRatio;
  const firstUpOctaveDotY   = keyY + (FIRST_UP_OCTAVE_DOT_Y_SEED * sizeRatio);
  const firstDownOctaveDotY = underBarY + (FIRST_DOWN_OCTAVE_DOT_Y_SEED * sizeRatio);
  const ascentSize          = sizeRatio * ASCENT_SIZE_SEED;
  let   ascentX             = keyX + (sizeRatio * ASCENT_X_SEED);
  const ascentY             = keyY + (sizeRatio * ASCENT_Y_SEED);
  const ascentHeight        = sizeRatio * ASCENT_HEIGHT_SEED;
  const ascentWidth         = sizeRatio * ASCENT_WIDTH_SEED ;
  const octaveDotSp         = sizeRatio * OCTAVE_DOT_SP_SEED;
  const octaveDotYs = [];
  if ( octave > 0 ) {
    for ( let i = 0; i < octave; i ++ ){
      octaveDotYs.push(firstUpOctaveDotY - ( octaveDotSp * i ))
    }
  } else if ( octave < 0 ) {
    for ( let i = 0; i > octave; i -- ){
      octaveDotYs.push(firstDownOctaveDotY - ( octaveDotSp * i )) // !!! i is negtive
    }
  } else {}
  const ascentRect = {
    x: ascentX,
    y: ascentY - ascentHeight,
    width:  ascentWidth,
    height: ascentHeight,
    fsize: ascentSize
  }
  const rects = [keyRect, ascentRect]
  const octaveDotsRect = {
    x: octaveDotX - octaveDotR,
    y: octaveDotYs.length > 0 ? 
      (Math.min(...octaveDotYs) - octaveDotR) :
      firstDownOctaveDotY,
    width: octaveDotR * 2,
    height: octaveDotYs.length > 0 ? 
      octaveDotSp * (octaveDotYs.length - 1) + (octaveDotR * 2) :
      0
  }
  if(octaveDotYs.length > 0) {
    rects.push(octaveDotsRect)
  }
  const extDash       = EXT_DASH_SEED * sizeRatio;
  const extDashSp     = EXT_DASH_SP_SEED * sizeRatio;
  const halfPointR    = HALF_POINT_R_SEED * sizeRatio;

  const extendDash = extAnalysis(noteType)
  const extDashY      = sizeRatio * EXT_DASH_Y_SEED + keyY;
  const extDashXs     = [];
  const extDashStart  = keyRect.x + keyRect.width + extDashSp;
  const extDashXDis   = extDashSp + extDash;
  for(let i = 0; i < extendDash; i ++ ) {
    extDashXs.push(extDashStart + ( extDashXDis * i));
  }
  
  const halfPointStart  = extDashStart + ( extDashXs.length * extDashXDis);
  const halfPointY      = extDashY;
  const halfPointSp     = extDashSp;
  const halfPointXs     = [];
  for(let i = 0; i < halfPoint; i ++) {
    halfPointXs.push(halfPointStart + (halfPointSp * i));
  }
  let xRBound = 0;
  if(extDashXs.length > 0) {
    xRBound = extDashXs[extDashXs.length - 1] + extDash
  }
  if(halfPointXs.length > 0) {
    xRBound = halfPointXs[halfPointXs.length - 1] + halfPointR
  }
  const ehRect = {
    x: extDashStart,
    y: extDashY - halfPointR,
    width: xRBound - extDashStart,
    height: 2 * halfPointR
  }
  if(xRBound !== 0) {
    rects.push(ehRect);
  }
  const noteRect = rectUnion(rects)
  const leftAlign = x + ((noteWidth - noteRect.width ) / 2)
  const leftShift = leftAlign - noteRect.x
  keyX              += leftShift
  ascentX           += leftShift
  keyRect.x         += leftShift
  ascentRect.x      += leftShift
  octaveDotX        += leftShift
  octaveDotsRect.x  += leftShift
  noteRect.x        += leftShift
  for(let i = 0; i < extDashXs.length; i ++) {
    extDashXs[i] += leftShift
  }
  for(let i = 0; i < halfPointXs.length; i ++) {
    halfPointXs[i] += leftShift
  }
  const outRect = {
    x: x, y: y, 
    width: noteWidth, height: noteHeight
  }
  return {
    noteRect, outRect,
    keyX, keyY, keyRect, 
    ascentX, ascentY, ascentRect, 
    octaveDotX, octaveDotYs, octaveDotR, octaveDotsRect,
    extDashXs, extDashY, extDash, 
    halfPointXs, halfPointY, halfPointR
  }
}
const ascentSign = (ascent) => {
  if(ascent === undefined) return null
  return KEY_ASCENT_SIGN[ascent]
}
const underBarStyle = {
  stroke: 'black',
  strokeWidth: 1
}

const curveIndex = (notes, ntProp) => {
  let currLineNote = null;
  let index = {}
  for(let i = 0; i < notes.length; i ++) {
    const note = notes[i]
    if(note.lineStart) currLineNote = note;
    const curve = note[ntProp]
    if(curve === undefined) continue
    for(const id of curve) {
      if(index[id] === undefined) {
        // start
        index[id] = {
          startNote: note,
          startLine: currLineNote
        }
      } else {
        // end
        const ent = index[id]
        ent.endNote = note
        ent.endLine = currLineNote
      }
    }
  }
  return index
}
const crescDimIndex = (notes, ntProp) => {
  let currLineNote = null;
  let index = {}
  let tmp = null
  for(let i = 0; i < notes.length; i ++) {
    const note = notes[i]
    if(note.lineStart) currLineNote = note;
    const target = note[ntProp]
    if(target === undefined) continue
    if(target.start) {
      tmp = {
        startNote: note,
        startLine: currLineNote
      }
    }
    if(target.end) {
      tmp.endNote = note
      tmp.endLine = currLineNote
      index[note.id] = tmp
    }
  }
  return index
}

export {noteLayout, ascentSign, underBarStyle, 
  underBarLayout, curveIndex, crescDimIndex,
  MEASURE_NOTATION_X_SEED, MEASURE_NOTATION_Y_SEED,
  MEASURE_NOTATION_FSIZE_SEED,
  NOTE_TOP_L2_X_SEED, NOTE_TOP_L2_Y_SEED,
  NOTE_BTN_L2_X_SEED, NOTE_BTN_L2_Y_SEED,
  STACC_Y_SEED,
  MARCATO_Y_SEED
}

