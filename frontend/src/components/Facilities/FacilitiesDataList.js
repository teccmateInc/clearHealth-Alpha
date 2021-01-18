import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import Axios from 'axios'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import FacilitiesModal from './FacilitiesModal'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function BasicTable() {
  const classes = useStyles()

  const [facilities, setFacilities] = useState([])
  const [detailShown, setDetailShown] = useState(false)
  const [viewDetail, setViewDetail] = useState(-1)

  const [editIndex, setEditIndex] = useState(-1)

  const getFacilities = async () => {
    const loginRes = await Axios.get('http://localhost:5000/facilities/')
    setFacilities(loginRes.data)
  }

  const details = (i) => {
    if (viewDetail >= 0 && viewDetail === i) {
      setDetailShown(false)
      setViewDetail(-1)
    } else {
      setDetailShown(true)
      setViewDetail(i)
    }
  }

  const editFacility = (i) => {
    if (editIndex >= 0 && editIndex === i) {
      setEditIndex(-1)
    } else {
      setEditIndex(i)
    }
  }

  useEffect(() => {
    getFacilities()
  }, [])

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#f2f4f7' }}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 20, fontWeight: 700 }}>
              Facilities
            </TableCell>
            <TableCell align='right'>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilities.map((facility, i) => (
            <TableRow key={facility._id}>
              <TableCell component='th' scope='row'>
                {detailShown && viewDetail === i ? (
                  <div>
                    <div>Doctor: {facility.nameOfDoctor}</div>
                    <div>Department: {facility.doctorDepartment}</div>
                    <div>Treatment Duration: {facility.treatmentDuration}</div>
                    <div>Medical Condition: {facility.medicalCondition}</div>
                    <div>Purpose Of Visit: {facility.purposeOfVisit}</div>
                    <div>Location: {facility.location}</div>
                    <div>Last Visit: {facility.lastVisit}</div>
                  </div>
                ) : (
                  `By: ${facility.nameOfDoctor}, At The ${facility.doctorDepartment} Department`
                )}
                {/* {ViewDetail} */}
              </TableCell>
              <TableCell align='right'>
                <Button
                  style={{
                    backgroundColor: '#6dcdb1',
                    color: '#fff',
                    padding: 6,
                    fontSize: 12,
                    marginRight: 5,
                  }}
                  onClick={() => details(i)}
                >
                  {detailShown && viewDetail === i ? (
                    <VisibilityOff style={{ fontSize: 15 }} />
                  ) : (
                    <Visibility style={{ fontSize: 15 }} />
                  )}
                </Button>
                <Button
                  style={{
                    backgroundColor: '#6dcdb1',
                    color: '#fff',
                    padding: 6,
                    fontSize: 12,
                  }}
                  onClick={() => editFacility(i)}
                >
                  <CreateIcon style={{ fontSize: 15 }} />
                </Button>
                {editIndex === i && (
                  <FacilitiesModal
                    type='edit'
                    editFacility={facility}
                    onclose={() => setEditIndex(-1)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
