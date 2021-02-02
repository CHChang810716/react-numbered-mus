import React from 'react'

/**
 * score = {
 *  notes = [
 *    {
 *      [must]
 *      keyTxt: <[0-7]>,
 *      noteType: <1, 2, 4, 8, 16, 32, 64,...>
 * 
 *      [optional]
 *      ascent: <[0, 1, 2]>, 0: b, 1: #, 2: <none> 
 *      octave: <int>,
 *      curve: "start",
 *      measureSplit: true, // back split
 *      tempoPerMeasure: 4,
 *      noteTypePerTempo: 4,
 *      baseTune: 60,
 *      ... plugin
 *    }
 *  ]
 * }
 * 
 * end note = {
 *  keyTxt: 0,
 *  noteType: 1,
 *  measureSplit: true,
 *  epsilon: true
 * }
 * 
 */