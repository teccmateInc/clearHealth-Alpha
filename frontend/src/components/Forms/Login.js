import React, { useState, useContext } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useForm } from 'react-hook-form'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import Alerts from '../Alert/Alert'
import Loader from '../Loading'
import ImgSlider from './Slider'
import Axios from 'axios'
import UserContext from '../../context/UserContext'

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontWeight: '700',
}

const Login = (props) => {
  let { register, handleSubmit, errors } = useForm()
  let [serverRes, setServerRes] = useState({ msg: null, type: 'error' })
  let [loading, setLoading] = useState(false)
  const { setUserData } = useContext(UserContext)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const loginUser = { ...data }
      const loginRes = await Axios.post(
        'http://localhost:5000/users/login',
        loginUser
      )
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
        setServerRes({ msg: 'Incorrect E-Mail or Password' })
      }
    } catch (err) {
      setLoading(false)
      setServerRes({ msg: err.response.data.msg })
    }
  }

  // useEffect(() => {
  //   if (!userData.user) props.history.push('/')
  // })

  return (
    <Grid container style={{ height: '100vh' }}>
      {loading && <Loader />}
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: '32px 0', boxShadow: 'unset' }}>
          <Grid align='center'>
            <Logo />
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid style={{ margin: '5px auto', width: '60%' }}>
              {serverRes.msg && (
                <Alerts msg={serverRes.msg} type={serverRes.type} />
              )}
              <h2 align='left'>Log In</h2>
              <TextField
                label='Email Address'
                placeholder='Enter Email Address'
                type='email'
                name='email'
                fullWidth
                required={true}
                variant='outlined'
                style={{ marginBottom: 16 }}
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
                name='password'
                inputRef={register({
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters/digits is required!',
                  },
                  maxLength: {
                    value: 21,
                    message: 'Maximum 21 characters is allowed!',
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
              <Button
                variant='contained'
                onClick={handleSubmit(onSubmit)}
                fullWidth
                type='submit'
                style={{
                  height: 50,
                  marginTop: 25,
                  backgroundColor: '#6dcdb1',
                  color: '#FFF',
                }}
                endIcon={<LockOpenIcon />}
              >
                Sign In
              </Button>
              <Typography align='left' style={{ marginTop: 10 }}>
                <Link to='/ForgetPassword' style={linkStyle}>
                  Forgot Password?
                </Link>
              </Typography>
              <Typography align='left' style={{ marginTop: 50 }}>
                {' '}
                Do you have an account?&nbsp;
                <Link to='/SignUp' style={linkStyle}>
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <ImgSlider />
    </Grid>
  )
}

export default Login
