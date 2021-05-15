import { numericStaffScore } from "../model/numeric-staff-score"
import Score from "./Score";
import React from 'react'

const NumStaffScore = (props) => {
  const stScore = numericStaffScore(props.score);
  const stProps = {...props}
  stProps.score.notes = stScore.notes;
  return <Score {...stProps} />
}

export default NumStaffScore