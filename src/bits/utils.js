import React from 'react'
const rectUnion = (rects) => {
  const res = rects.reduce((r, pr) => {
    let x = Math.min(r.x, pr.x)
    let y = Math.min(r.y, pr.y)
    return {
      x: x,
      y: y,
      width: Math.max(r.x + r.width, pr.x + pr.width)  - x,
      height: Math.max(r.y + r.height, pr.y + pr.height) - y
    }
  })
  return res;
}

const svgDbg = {
  strokeWidth: 1, 
  stroke:'black', 
  fill: 'none'
}

const QCurve = ({p0, p1, qp}) => {
  return <path d={`M${p0[0]} ${p0[1]} Q ${qp[0]} ${qp[1]} ${p1[0]} ${p1[1]}`} stroke="black" fill="transparent" />
}
const gnrlFontStyle = {
  fontFamily: 'serif',
  fontStyle: 'italic',
  fontWeight: 'bold'
}

const fontSizeToHeight = (size) => {
  return size * 0.713;
}
const fontHeightToSize = (h) => {
  return h * 1.4025;
}
const fontSizeToWidth = (size) => {
  return size * 0.54;
}
const fontWidthToSize = (w) => {
  return w * 1.852;
}

export {
  rectUnion, svgDbg, 
  QCurve, gnrlFontStyle,
  fontSizeToHeight,
  fontSizeToWidth,
  fontHeightToSize,
  fontWidthToSize,
}