import React from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import ImgSlider from './Slider'

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontWeight: '700',
}

const ForgetPassword = () => {
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} style={{ height: '100vh' }}>
        <Paper style={{ padding: '32px 0', boxShadow: 'unset' }}>
          <Grid align='center'>
            <Logo />
          </Grid>
          <Grid style={{ margin: '5px auto', width: '60%' }}>
            <h4 align='left' style={{ margin: '15px auto' }}>
              Enter your email address, to set a new password{' '}
            </h4>
            <TextField
              label='Email Address'
              placeholder='Enter Email Address'
              fullWidth
              required
              variant='outlined'
              starticon={<LockOpenIcon />}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              style={{ height: 50, marginTop: 25, backgroundColor: '#6dcdb1' }}
              endIcon={<LockOpenIcon />}
            >
              Continue
            </Button>
            <Typography align='center' style={{ marginTop: 50 }}>
              Go Back To&nbsp;
              <Link to='/' style={linkStyle}>
                Login
              </Link>
              &nbsp;Page
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <ImgSlider />
    </Grid>
  )
}

export default ForgetPassword
