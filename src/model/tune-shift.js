/**
 * 
 * tid: 0  1  2  3 4 5  6 7  8 9 10 11
 * cid: 1 #1  2 #2 3 4 #4 5 #5 6 #6  7
 * Gid: 4 #4  5
 * input: 
 * 
 * G(#, 1) 
 * cid: 2
 * 
 * 1. cid: 2 -> tid: 2
 * 2. tid: 2 -> Gid: 5
 */
const degree = [2, 2, 1, 2, 2, 2, 1]

// twid[key][ascent]
const twid = [
  [null, null, null],
  [11, 1 , 0 ],  // 1
  [1 , 3 , 2 ],  // 2
  [3 , 5 , 4 ],  // 3
  [4 , 6 , 5 ],  // 4
  [6 , 8 , 7 ],  // 5
  [8 , 10, 9 ],  // 6
  [10,  0, 11],  // 7
]

const catid = [
  [null, 7, 1],
  [2, 1, null],
  [null, null, 2],
  [3, 2, null],
  [4, null, 3],
  [null, 3, 4],
  [5, 4, null],
  [null, null, 5],
  [6, 5, null],
  [null, null, 6],
  [7, 6, null],
  [1, null, 7]
]

const toTwID = (key, ascent) => {
  if(ascent === undefined || ascent === null) {
    ascent = 2;
  }
  const res = twid[key][ascent];
  if(res === undefined || res === null) {
    throw Error(`undefined (key, ascent): (${key}, ${ascent})`);
  }
  return res;
}
const toCatID = (_twid, ascentHint) => {
  const catEntry = catid[_twid];
  if(ascentHint !== undefined && ascentHint !== null) {
    const keyTxt = catEntry[ascentHint];
    if(keyTxt) return {
      keyTxt, 
      ascent: ascentHint
    };
  }
  for(let i = 2; i >= 0; i --) {
    const keyTxt = catEntry[i];
    if(keyTxt !== null) {
      const res = {keyTxt}
      if(i != 2) {
        res.ascent = i;
      }
      return res
    }
  }
  return {keyTxt: catEntry[2]}
}
const tuneShift = (key, ascent, twBias, outputAscentHint) => {
  const itwid = toTwID(key, ascent);
  const t_otwid = itwid + twBias;
  const otwid = t_otwid < 0 ? t_otwid + 12 : t_otwid % 12;
  let octaveShift = 0;
  if(t_otwid < 0) octaveShift = -1;
  else if(t_otwid > 12) octaveShift = 1;
  return { octaveShift, ...toCatID(otwid, outputAscentHint) }
}
const tuneCharsTWID = {
  'C': 0,
  'D': 2,
  'E': 4,
  'F': 5,
  'G': 7,
  'A': 9,
  'B': 11
}
const majorTransform = (from, to) => {
  const fromTWID = tuneCharsTWID[from];
  const toTWID = tuneCharsTWID[to];
  return fromTWID - toTWID;
}
const tuneCharShift = (key, ascent, fromT, toT, outputAscentHint) => {
  return tuneShift(
    key, ascent, 
    majorTransform(fromT, toT), 
    outputAscentHint
  );
}
const ascentNumToTuneID = (ascentCode, num) => {
  const table = [[
    0, 5, 10, 3, 8, 1, 6, 11
  ],[
    0, 7, 2, 9, 4, 11, 6, 1
  ]]
  if(ascentCode >= 2) { 
    throw Error(
      `ascent to tune: ascent must be 0/1 but get: ${ascentCode}`
    ); 
  }
  if(ascentCode === undefined || ascentCode === null) {
    return 0
  }
  return table[ascentCode][num]
}
const ascentNumToTune = (ascentCode, num) => {
  const table = [
    'C',  '#C', 'D',  '#D', 'E',  'F', 
    '#F', 'G',  '#G', 'A',  '#A', 'B'
  ]
  return table[
    ascentNumToTuneID(
      ascentCode, num
    )
  ]
}
const ascentForKey = (tuneAscent, key) => {
  const {sign, num} = tuneAscent;
  if(sign === undefined) return undefined
  const table = [[7, 3, 6, 2, 5, 1, 4],[4, 1, 5, 2, 6, 3, 7]]
  const hitTable = []
  for(let i = 0; i < 8; i ++) hitTable[i] = false;
  const refTable = table[sign]
  for(let i = 0; i < num; i ++) {
    hitTable[refTable[i]] = true;
  }
  if(hitTable[key]) {
    return sign;
  } else return undefined;
}
const ascentForNote = (tuneAscent, key, ascent) => {
  const ak = ascentForKey(tuneAscent, key);
  if(ascent === undefined || ascent === null) return ak;
  if(ascent === 2) return undefined;
  return ascent;
}

const keyShift = (baseTune) => {
  const table = {
    A: -5,
    B: -6,
    C:  0,
    D: -1,
    E: -2,
    F: -3,
    G: -4
  }
  return table[baseTune]
}
export {
  tuneShift, tuneCharShift, 
  ascentNumToTuneID, ascentNumToTune,
  ascentForKey, ascentForNote, keyShift
}