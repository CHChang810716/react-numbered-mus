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

export {rectUnion}