import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Grid,
} from '@material-ui/core'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import EditOutlined from '@material-ui/icons/EditOutlined'
import Axios from 'axios'
import Alerts from '../Alert/Alert'
import { useForm } from 'react-hook-form'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 2),
    width: '50%',
  },
}))

export default function TransitionsModal({
  type = 'add',
  editFacility,
  onclose,
}) {
  const classes = useStyles()
  let { register, handleSubmit, errors } = useForm()
  const [open, setOpen] = useState(type === 'edit' ? true : false)
  console.log('open', type, editFacility)
  const [serverRes, setServerRes] = useState({ msg: null, type: 'error' })
  const isEdit = type === 'edit'
  const onSubmit = async (data) => {
    console.log(data)
    // try {
    // if(isEdit){
    //Edit axios req is here
    // } else {
    // add axios req
    //   const newFacility = { ...data }
    //   console.log(newFacility)
    //   await Axios.post('http://localhost:5000/facilities/', newFacility)
    // }
    // } catch (err) {
    //   setServerRes({ msg: err.response.data.msg })
    // }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    type === 'edit' && onclose(false)
  }

  return (
    <>
      {type === 'add' && (
        <Button
          style={{
            backgroundColor: '#6dcdb1',
            color: '#fff',
            padding: 20,
            margin: 10,
            fontSize: 15,
          }}
          onClick={handleOpen}
        >
          <LocalHospitalIcon />
          &nbsp;&nbsp;Add Facility
        </Button>
      )}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Create Facilities</h2>
            <p id='transition-modal-description'>
              Fill The Following Forms &amp; Click On Add
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                // xs={12}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {serverRes.msg && (
                  <Alerts msg={serverRes.msg} type={serverRes.type} />
                )}
                <TextField
                  label='Name Of Doctor'
                  placeholder="Enter Doctor's Name"
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='nameOfDoctor'
                  defaultValue={isEdit ? editFacility.nameOfDoctor : ''}
                  inputRef={register({
                    required: `Doctor's Name is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.nameOfDoctor ? true : false}
                  helperText={
                    errors.nameOfDoctor && (
                      <span role='alert'>
                        {errors.nameOfDoctor.type === 'required'
                          ? errors.nameOfDoctor.message
                          : errors.nameOfDoctor.type === 'minLength'
                          ? errors.nameOfDoctor.message
                          : errors.nameOfDoctor.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Department'
                  placeholder="Enter Doctor's Department"
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='doctorDepartment'
                  defaultValue={isEdit ? editFacility.doctorDepartment : ''}
                  inputRef={register({
                    required: `Doctor's Name is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.doctorDepartment ? true : false}
                  helperText={
                    errors.doctorDepartment && (
                      <span role='alert'>
                        {errors.doctorDepartment.type === 'required'
                          ? errors.doctorDepartment.message
                          : errors.doctorDepartment.type === 'minLength'
                          ? errors.doctorDepartment.message
                          : errors.doctorDepartment.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Treatment Duration'
                  placeholder='Enter Treatment Duration'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='treatmentDuration'
                  defaultValue={isEdit ? editFacility.treatmentDuration : ''}
                  inputRef={register({
                    required: `Treatment Duration is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.treatmentDuration ? true : false}
                  helperText={
                    errors.treatmentDuration && (
                      <span role='alert'>
                        {errors.treatmentDuration.type === 'required'
                          ? errors.treatmentDuration.message
                          : errors.treatmentDuration.type === 'minLength'
                          ? errors.treatmentDuration.message
                          : errors.treatmentDuration.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Medical Condition'
                  placeholder='Enter Medical Condition'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='medicalCondition'
                  defaultValue={isEdit ? editFacility.medicalCondition : ''}
                  inputRef={register({
                    required: `Medical Condition is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.medicalCondition ? true : false}
                  helperText={
                    errors.medicalCondition && (
                      <span role='alert'>
                        {errors.medicalCondition.type === 'required'
                          ? errors.medicalCondition.message
                          : errors.medicalCondition.type === 'minLength'
                          ? errors.medicalCondition.message
                          : errors.medicalCondition.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Purpose Of Visit'
                  placeholder='Enter Purpose Of Visit'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='purposeOfVisit'
                  defaultValue={isEdit ? editFacility.purposeOfVisit : ''}
                  inputRef={register({
                    required: `Your Purpose Of Visit is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.purposeOfVisit ? true : false}
                  helperText={
                    errors.purposeOfVisit && (
                      <span role='alert'>
                        {errors.purposeOfVisit.type === 'required'
                          ? errors.purposeOfVisit.message
                          : errors.purposeOfVisit.type === 'minLength'
                          ? errors.purposeOfVisit.message
                          : errors.purposeOfVisit.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Location'
                  placeholder='Enter Location'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='location'
                  defaultValue={isEdit ? editFacility.location : ''}
                  inputRef={register({
                    required: `Location is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.location ? true : false}
                  helperText={
                    errors.location && (
                      <span role='alert'>
                        {errors.location.type === 'required'
                          ? errors.location.message
                          : errors.location.type === 'minLength'
                          ? errors.location.message
                          : errors.location.message}
                      </span>
                    )
                  }
                />

                <TextField
                  label='Last Visit'
                  placeholder='Enter Last Visit'
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  style={{ marginBottom: '16px' }}
                  name='lastVisit'
                  defaultValue={isEdit ? editFacility.lastVisit : ''}
                  inputRef={register({
                    required: `Last Visit is required`,
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters is required!',
                    },
                    maxLength: {
                      value: 35,
                      message: 'Maximum 256 characters is allowed!',
                    },
                  })}
                  error={errors.lastVisit ? true : false}
                  helperText={
                    errors.lastVisit && (
                      <span role='alert'>
                        {errors.lastVisit.type === 'required'
                          ? errors.lastVisit.message
                          : errors.lastVisit.type === 'minLength'
                          ? errors.lastVisit.message
                          : errors.lastVisit.message}
                      </span>
                    )
                  }
                />

                <Grid
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    style={{
                      height: 50,
                      marginTop: 25,
                      backgroundColor: '#6dcdb1',
                      width: '48%',
                    }}
                    onClick={handleSubmit(onSubmit)}
                    endIcon={isEdit ? <EditOutlined /> : <AddCircleOutline />}
                  >
                    {isEdit ? 'Update' : 'Add'}
                  </Button>

                  <Button
                    variant='contained'
                    style={{
                      height: 50,
                      marginTop: 25,
                      backgroundColor: '#6dcdb1',
                      color: '#fff',
                      width: '48%',
                    }}
                    onClick={handleClose}
                    endIcon={<CancelIcon />}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  )
}
