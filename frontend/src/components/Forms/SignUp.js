import React, { useState, useContext, useEffect } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import Loader from '../Loading'
import Alerts from '../Alert/Alert'
import ImgSlider from './Slider'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontWeight: '700',
}

const SignUp = (props) => {
  let { register, handleSubmit, errors } = useForm()
  let [serverRes, setServerRes] = useState({ msg: null, type: 'error' })
  let [loading, setLoading] = useState(false)

  const { userData, setUserData } = useContext(UserContext)
  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const newUser = { ...data }
      const { email, password } = data
      await Axios.post('http://localhost:5000/users/register', newUser)
      const loginRes = await Axios.post('http://localhost:5000/users/login', {
        email,
        password,
      })
      if (loginRes.data.success) {
        localStorage.setItem('auth-token', loginRes.data.token)
        setLoading(false)
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        })
        props.history.push('/Timeline')
      } else {
        setLoading(false)
        setServerRes({ msg: 'Some Error Has Occurred While Registering' })
      }
    } catch (err) {
      setLoading(false)
      setServerRes({ msg: err.response.data.msg })
    }
  }

  // useEffect(() => {
  //   if (userData.user) props.history.push('/')
  // })

  return (
    <Grid container>
      {loading && <Loader />}
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: '32px 0' }}>
          <Grid align='center'>
            <Logo />
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid style={{ margin: '5px auto', width: '60%' }}>
              {serverRes.msg && (
                <Alerts msg={serverRes.msg} type={serverRes.type} />
              )}
              <h2 align='left'>Welcome to ClearHealth! </h2>
              <h4 align='left' style={{ margin: '15px auto' }}>
                To get started, enter your email address.{' '}
              </h4>
              <TextField
                label='First Name'
                placeholder='Enter First Name'
                fullWidth
                required
                variant='outlined'
                type='text'
                style={{ marginBottom: '16px' }}
                name='firstname'
                inputRef={register({
                  required: 'First Name is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters is required!',
                  },
                  maxLength: {
                    value: 256,
                    message: 'Maximum 256 characters is allowed!',
                  },
                })}
                error={errors.firstname ? true : false}
                helperText={
                  errors.firstname && (
                    <span role='alert'>
                      {errors.firstname.type === 'required'
                        ? errors.firstname.message
                        : errors.firstname.type === 'minLength'
                        ? errors.firstname.message
                        : errors.firstname.message}
                    </span>
                  )
                }
              />
              <TextField
                label='Last Name'
                placeholder='Enter Last Name'
                fullWidth
                required
                variant='outlined'
                type='text'
                style={{ marginBottom: '16px' }}
                name='lastname'
                inputRef={register({
                  required: 'Last Name is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters is required!',
                  },
                  maxLength: {
                    value: 256,
                    message: 'Maximum 256 characters is allowed!',
                  },
                })}
                error={errors.lastname ? true : false}
                helperText={
                  errors.lastname && (
                    <span role='alert'>
                      {errors.lastname.type === 'required'
                        ? errors.lastname.message
                        : errors.lastname.type === 'minLength'
                        ? errors.lastname.message
                        : errors.lastname.message}
                    </span>
                  )
                }
              />
              <TextField
                label='Email Address'
                placeholder='Enter Email Address'
                fullWidth
                required
                variant='outlined'
                starticon={<LockOpenIcon />}
                type='email'
                style={{ marginBottom: '16px' }}
                name='email'
                inputRef={register({
                  required: 'E-Mail is required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g,
                    message: 'Invalid Email Address!',
                  },
                  maxLength: {
                    value: 256,
                    message: 'Maximum 256 characters is allowed!',
                  },
                })}
                error={errors.email ? true : false}
                helperText={
                  errors.email && (
                    <span role='alert'>
                      {errors.email.type === 'required'
                        ? errors.email.message
                        : errors.email.type === 'pattern'
                        ? errors.email.message
                        : errors.email.message}
                    </span>
                  )
                }
              />
              <TextField
                label='Password'
                placeholder='Enter Password'
                fullWidth
                required
                variant='outlined'
                type='password'
                style={{ marginBottom: '16px' }}
                name='password'
                inputRef={register({
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters is required!',
                  },
                  maxLength: {
                    value: 21,
                    message: 'Password Maximum 21 characters long!',
                  },
                })}
                error={errors.password ? true : false}
                helperText={
                  errors.password && (
                    <span role='alert'>
                      {errors.password.type === 'required'
                        ? errors.password.message
                        : errors.password.type === 'minLength'
                        ? errors.password.message
                        : errors.password.message}
                    </span>
                  )
                }
              />
              <TextField
                label='Confirm Password'
                placeholder='Enter Confirm Password Again'
                fullWidth
                required
                variant='outlined'
                type='password'
                style={{ marginBottom: '16px' }}
                name='passwordCheck'
                autoComplete='password'
                inputRef={register({
                  required: 'E-Mail is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters is required!',
                  },
                  maxLength: {
                    value: 21,
                    message: 'Password Maximum 21 characters long!',
                  },
                })}
                error={errors.passwordCheck ? true : false}
                helperText={
                  errors.passwordCheck && (
                    <span role='alert'>
                      {errors.passwordCheck.type === 'required'
                        ? errors.passwordCheck.message
                        : errors.passwordCheck.type === 'minLength'
                        ? errors.passwordCheck.message
                        : errors.passwordCheck.message}
                    </span>
                  )
                }
              />

              <NumberFormat
                format='######-##-####'
                mask='_'
                customInput={TextField}
                label='IC Number'
                placeholder='Enter IC Number'
                fullWidth
                required
                variant='outlined'
                name='icNumber'
                inputRef={register({
                  required: 'IC is required',
                  minLength: {
                    value: 12,
                    message: 'Minimum 12 characters is required!',
                  },
                })}
                error={errors.icNumber ? true : false}
                helperText={
                  errors.icNumber && (
                    <span role='alert'>
                      {errors.icNumber.type === 'required'
                        ? errors.icNumber.message
                        : errors.icNumber.type === 'minLength'
                        ? errors.icNumber.message
                        : errors.icNumber.message}
                    </span>
                  )
                }
              />

              <Button
                variant='contained'
                color='primary'
                fullWidth
                type='submit'
                // onClick={handleSubmit(onSubmit)}
                style={{
                  height: 50,
                  marginTop: 25,
                  backgroundColor: '#6dcdb1',
                }}
                endIcon={<LockOpenIcon />}
              >
                Continue
              </Button>
              <Typography align='left' style={{ marginTop: 50 }}>
                {' '}
                Already Have An Account?&nbsp;
                <Link to='/' style={linkStyle}>
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </form>
        </Paper>
      </Grid>

      {/* <img
          alt='Picnic Health'
          src={BackgroundImage}
          style={{ width: '100%', height: '100vh' }}
        /> */}
      <ImgSlider />
    </Grid>
  )
}

export default SignUp
