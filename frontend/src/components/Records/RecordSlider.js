import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import DialogBox from './DialogBox'

const reportDetails = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    // flexGrow: 1,
    padding: '50px 0 0',
    width: '50%',
    // height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
  },
  root0: {
    textAlign: 'center',
    maxWidth: 400,
    flexGrow: 1,
    width: 180,
    '&:hover': {
      color: 'blue',
      opacity: '0.75',
      cursor: 'pointer',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: '75%',
    width: '100%',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  demoImg: {
    height: '170px',
    width: '170px',
    margin: '0 6px',
    borderRadius: '5px',
  },
}))

export default function RecordImageSlider() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = reportDetails.length

  const [openDialog, setOpenDialog] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  let OpenSlider = () => {
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{reportDetails[activeStep].label}</Typography>
          {/* Text Overflow Ellipsis */}
        </Paper>
        <img
          className={classes.img}
          src={reportDetails[activeStep].imgPath}
          alt={reportDetails[activeStep].label}
        />
        <span>View Images</span>
        <MobileStepper
          steps={maxSteps}
          position='static'
          variant='text'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
    )
  }

  let openDialogBox = () => {
    setOpenDialog(true)
  }

  return (
    <div className={classes.root0} onClick={openDialogBox}>
      <img
        className={classes.demoImg}
        src={reportDetails[activeStep].imgPath}
        alt={reportDetails[activeStep].label}
      />
      <span>View Images</span>
      {openDialog && (
        <DialogBox
          _open={openDialog}
          onclose={(v) => setOpenDialog(v)}
          styles={classes}
          reportDetails={reportDetails}
        />
      )}
    </div>
  )
}
