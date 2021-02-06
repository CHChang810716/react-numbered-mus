
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

const underBarLayout = (
  kr0, kr1, level, ntSizeRatio
) => {
  const space = ntSizeRatio * 1;
  const x0 = kr0.x;
  const x1 = kr1.x + kr1.width;
  const y = kr0.y + kr0.height + (space * (level + 1))
  return [x0, x1, y]
}

const noteLayout = (x, y, noteWidth, noteHeight, sizeRatio, octave, underBar) => {

  const keyX = x + (noteWidth / 2) - (1 * sizeRatio);
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

  const octaveDotX          = keyX + (OCTAVE_DOT_X_SEED * sizeRatio);
  const octaveDotR          = OCTAVE_DOT_R_SEED * sizeRatio;
  const firstUpOctaveDotY   = keyY + (FIRST_UP_OCTAVE_DOT_Y_SEED * sizeRatio);
  const firstDownOctaveDotY = underBarY + (FIRST_DOWN_OCTAVE_DOT_Y_SEED * sizeRatio);
  const ascentSize          = sizeRatio * ASCENT_SIZE_SEED;
  const ascentX             = keyX + (sizeRatio * ASCENT_X_SEED);
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
  // const octaveDotsRect = {
  //   x: ascentX,
  //   y: ascentY - ascentHeight,
  //   width:  ascentWidth,
  //   height: ascentHeight
  // }
  return [
    keyX, keyY, ascentX, ascentY, 
    keyRect, ascentRect, octaveDotX, octaveDotYs, octaveDotR
  ]
}

const ascentSign = (ascent) => {
  if(ascent === undefined) return null
  return KEY_ASCENT_SIGN[ascent]
}
const underBarStyle = {
  stroke: 'black',
  strokeWidth: 1
}

export {noteLayout, ascentSign, underBarStyle, underBarLayout}

