import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

export default function ViewDetail() {
  const [detailShown, setDetailShown] = useState(false)
  let FacilityDetail = () => {
    return (
      <>
        {detailShown ? (
          <div>
            <div>Doctor: {facilities.nameOfDoctor}</div>
            <div>Department: {facilities.doctorDepartment}</div>
            <div>Treatment Duration: {facilities.treatmentDuration}</div>
            <div>Medical Condition: {facilities.medicalCondition}</div>
            <div>Purpose Of Visit: {facilities.purposeOfVisit}</div>
            <div>Location: {facilities.location}</div>
            <div>Last Visit: {facilities.lastVisit}</div>
          </div>
        ) : (
          `By: ${facilities.nameOfDoctor}, At The ${facilities.doctorDepartment} Department`
        )}
      </>
    )
  }
  return (
    <>
      <Button
        style={{
          backgroundColor: '#6dcdb1',
          color: '#fff',
          padding: 6,
          fontSize: 12,
          marginRight: 5,
        }}
        onClick={() => setDetailShown(!detailShown)}
      >
        {detailShown ? (
          <VisibilityOff style={{ fontSize: 15 }} />
        ) : (
          <Visibility style={{ fontSize: 15 }} />
        )}
      </Button>
    </>
  )
}
