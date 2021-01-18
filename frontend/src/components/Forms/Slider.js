import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'
import img1 from '../../assets/imgs/1.png'
import img2 from '../../assets/imgs/2.png'
import img3 from '../../assets/imgs/3.png'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#6dcdb1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '90%',
  },
  sect: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
    color: '#fff',
    outline: 'none',
    '& h6': {
      marginTop: '32px',
      fontWeight: 'bolder',
    },
    '& span': {
      width: '60%',
      textAlign: 'center',
      marginTop: '16px',
    },
  },
  img: {
    borderRadius: '16px',
  },
}))

export default function ImgSlider() {
  let classes = useStyles()
  var settings = {
    dots: true,
    infinite: false,
  }
  return (
    <Grid item xs={12} sm={6} className={classes.root}>
      <Slider {...settings} className={classes.slider}>
        <div className={classes.sect}>
          <img src={img1} alt='snippits' className={classes.img} />
          <Typography variant='h6' component='h6'>
            All your medical records in one place
          </Typography>
          <Typography variant='h6' component='span'>
            We'll collect and organize all your medical records – yours to keep,
            use, and share. Just tell us about your doctors and we'll take it
            from there.
          </Typography>
        </div>
        <div className={classes.sect}>
          <img src={img2} alt='snippits' className={classes.img} />
          <Typography variant='h6' component='h6'>
            Your medical data is yours to own.
          </Typography>
          <Typography variant='h6' component='span'>
            We believe that better care happens when you have control over your
            records. Securely access your records from any device, share with
            doctors, and remove access at any time.
          </Typography>
        </div>
        <div className={classes.sect}>
          <img src={img3} alt='snippits' className={classes.img} />
          {/* <Typography variant='h6' component='h6'>
            Your medical data is yours to own.
          </Typography>
          <Typography variant='h6' component='span'>
            We believe that better care happens when you have control over your
            records. Securely access your records from any device, share with
            doctors, and remove access at any time.
          </Typography> */}
        </div>
      </Slider>
    </Grid>
  )
}
