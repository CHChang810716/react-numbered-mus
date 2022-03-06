import React from 'react'
import { underBarStyle } from '../bits/note-utils';
import { QCurve } from '../bits/utils';
import Page from './Page'
import measureSpaceAnalysis from '../bits/measure-space-analysis'
import lineSpaceAnalysis from '../bits/line-space-analysis'
import underBarAnalysis from '../bits/under-bar-analysis'
import pageSpaceAnalysis from '../bits/page-space-analysis'
const BASE_LINE_HEIGHT_SEED = 20

const FONT_SIZE_SEED = 2.6
const X_SEED = -1.1;
const Y_SEED = -1.1;
const Y_SHIFT_SEED = 0.9;
const X_SHIFT_SEED = 0.9;
const UNDER_BAR_LENGTH_SEED = FONT_SIZE_SEED * 0.25;
const UNDER_BAR_Y_SEED = Y_SEED - 0.14;
const APG_FONT_SIZE_SEED                = 3.5     ;
const APG_FONT_HEIGHT_SEED              = APG_FONT_SIZE_SEED * 0.713 ;
const APG_FONT_WIDTH_SEED               = APG_FONT_SIZE_SEED * 0.54  ;
const notesSpaceAnalysis = (
  notes, {
    pageCntHeight,
    maxLineWeight,
    size
  }
) => {
  if(!notes[notes.length - 1].epsilon) {
    notes.push({
      keyTxt: 0, 
      noteType: 1, 
      epsilon: true
    })
  }
  const pageCntHeightSpace = pageCntHeight/ size
  const [notes0, measureIndex] = measureSpaceAnalysis(notes);
  const [notes1, lineIndex] = lineSpaceAnalysis(
    notes0, measureIndex, maxLineWeight, BASE_LINE_HEIGHT_SEED
  );
  const [notes2, pageIndex] = pageSpaceAnalysis(notes1, pageCntHeightSpace)

  // annotation analysis
  const notes3 = underBarAnalysis(notes2);
  return [notes3, measureIndex, lineIndex, pageIndex];
}
const Appoggiatura = ({note, sizeRatio}) => {
  if(note.apg === undefined) {
    console.warn("appoggiatura require apg property")
    return null;
  }
  const {pos, apg} = note;
  const {outRect, keyRect} = pos
  const midX = keyRect.x + (sizeRatio * X_SEED)
  const midY = keyRect.y + (sizeRatio * Y_SEED)
  const nx = midX + (sizeRatio * X_SHIFT_SEED)
  const ny = midY + (sizeRatio * Y_SHIFT_SEED)
  const apgSizeRatio = sizeRatio * 0.5;
  const apgFontW = apgSizeRatio * APG_FONT_WIDTH_SEED;
  const apgW = apg.length * apgFontW;
  const apgH = apgSizeRatio * APG_FONT_HEIGHT_SEED;
  const apgX = midX - (0.5 * apgW) - (apgFontW * 0.3);
  const apgY = midY - apgH - (sizeRatio * 1.2); 
  const [
    apgNotes, measureIndex, 
    lineIndex, pageIndex
  ] = notesSpaceAnalysis(
    apg,{
      pageCntWidth: apgW,
      pageCntHeight: apgH,
      maxLineWeight: 999, 
      size: apgSizeRatio,
    }
  )
  return [
    <Page
      key={0}
      notes={apgNotes}
      startNoteI={0}
      x={apgX}
      y={apgY}
      cntWidth={apgW}
      cntHeight={apgH}
      sizeRatio={apgSizeRatio}
      MEASURE_X_PADDING_SEED={0}
      hasSectionID={false}
      renderMeasureBar={false}
      name="apg"
    />,
    <QCurve key={1}
      p0={[midX, midY]}
      p1={[nx, ny]}
      qp={[midX, ny]}
    />,
    // <circle key={2} fill="black" cx={midX} cy={midY} r={1} />,
    // <rect key={3} x={apgX} y={apgY} width={apgW} height={apgH} style={underBarStyle} />
  ]
}

export default Appoggiatura;