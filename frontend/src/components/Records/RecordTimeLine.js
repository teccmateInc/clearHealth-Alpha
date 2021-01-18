import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
// import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserMd,
  faDownload,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core'
import RecordImageSlider from './RecordSlider'

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '6px 32px',
    width: '70%',
    float: 'left',
    borderRadius: '0 0 12px 12px',
    boxShadow: '2px 5px 20px 4px #b9babbde',
  },
  header: {
    padding: '16px 2px',
    borderBottom: '1px solid #D7DCE7',
  },
  details: {
    padding: '16px 0 0',
    display: 'flex',
    flexDirection: 'column',
    '& h2': {
      marginBottom: '6px',
    },
    '&:last-child': {
      paddingBottom: 0,
    },
    '& div': {
      marginBottom: '20px',
    },
  },
  type: {
    '& svg': {
      margin: '0 6px 0 0',
      fontSize: '1.2rem',
    },
    width: 'fit-content',
    padding: '10px 12px',
    borderRadius: '10px 10px 0 0',
    // backgroundColor: '#049EE0',
    backgroundColor: '#6dcdb1',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 'medium',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  content: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    margin: '8px 0 20px 0',
  },
  date: {
    backgroundColor: '#ffffff !important',
    marginBottom: 0,
    // position: 'fixed',
    display: 'flex',
    height: '38px',
    width: '38px',
    marginLeft: '-7px',
    '& p': {
      margin: '0 !important',
      textAlign: 'center',
      padding: '1px',
      // color: '#6dcdb1',
      color: '#5b6360',
      // background: '#dceeff40',
      borderRadius: '50px',
      fontWeight: 'bold',
    },
  },
  yr: {
    minHeight: '35px',
    paddingLeft: 'calc(17%)',
  },
  year: {
    float: 'right',
    padding: '6px',
    background: '#9ca5ad',
    color: 'white',
    borderRadius: '4px',
    // position: 'fixed',
    position: 'absolute',
    // left: '15.79rem',
    zIndex: 1,
  },
  connector: {
    width: '6px',
    backgroundColor: '#bdbdbd45',
    margin: '0 18px',
  },
  iconbtn: {
    padding: '8px',
    borderRadius: 0,
  },
  subText: {
    fontSize: '14px',
    display: 'flex',
    marginTop: '8px',
  },
  txt: {
    fontSize: 'inherit',
    marginLeft: '8px',
  },
  location: {
    // marginLeft: '24px',
  },
  details2: {
    display: 'flex',
    flexDirection: 'row',
    '& :first-child': {
      // maxWidth: '75%',
    },
    '& :last-child': {
      // maxWidth: '25%',
    },
  },
}))

export default function RecordsTimeLine() {
  const classes = useStyles()
  let SubHeader = () => {
    return (
      <Grid container className={classes.subText}>
        <Grid item xs={6} sm={6}>
          <FontAwesomeIcon icon={faUserMd} color={'#9fa6ad'} />
          <small className={classes.txt}>Doctor Name</small>
        </Grid>
        <Grid item xs={6} sm={6} className={classes.location}>
          <FontAwesomeIcon icon={faMapMarkerAlt} color={'#9fa6ad'} />
          <small className={classes.txt}>Location or address</small>
        </Grid>
      </Grid>
    )
  }
  let Details = () => {
    return (
      <div>
        <Typography variant='h5' component='h2'>
          Impression
        </Typography>
        <Typography variant='body2' color='textSecondary' component='span'>
          Multiple lesions again suggest chronic demyelination. Mild atrophy
          greatest in the frontal region may be associated with multiple
          sclerosis. Findings appear stable when compared with the prior study.
          There is no abnormal enhancement.
        </Typography>
      </div>
    )
  }
  return (
    <Timeline style={{ overflowY: 'auto' }} align='left'>
      <div style={{ height: '75px' }}></div>
      <div className={classes.yr}>
        <Typography color='textSecondary' className={classes.year}>
          2020
        </Typography>
      </div>
      <TimelineItem>
        {/* <TimelineOppositeContent>
          <Typography color='textSecondary' className={classes.year}>
            2020
          </Typography>
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineDot
            className={classes.date}
            style={{ backgroundColor: 'unset' }}
          >
            <Typography variant='body2' color='textSecondary'>
              JAN 28
            </Typography>
          </TimelineDot>
          <TimelineConnector className={classes.connector} />
        </TimelineSeparator>
        <TimelineContent className={classes.content}>
          <Paper elevation={3} className={classes.type}>
            <FastfoodIcon />
            Report
          </Paper>
          <Card className={classes.section}>
            <CardHeader
              className={classes.header}
              action={
                <IconButton
                  aria-label='settings'
                  className={`${classes.subText} ${classes.iconbtn}`}
                >
                  <FontAwesomeIcon icon={faDownload} color={'#9fa6ad'} />
                  <small className={classes.txt}>Download PDF</small>
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader={<SubHeader />}
            />
            <CardContent className={classes.details}>
              <Details />
            </CardContent>
          </Card>
        </TimelineContent>
      </TimelineItem>
      <div className={classes.yr}>
        <Typography color='textSecondary' className={classes.year}>
          2020
        </Typography>
      </div>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            className={classes.date}
            style={{ backgroundColor: 'unset' }}
          >
            <Typography variant='body2' color='textSecondary'>
              JAN 28
            </Typography>
          </TimelineDot>
          <TimelineConnector className={classes.connector} />
        </TimelineSeparator>
        <TimelineContent className={classes.content}>
          <Paper elevation={3} className={classes.type}>
            <FastfoodIcon />
            Report
          </Paper>
          <Card className={classes.section}>
            <CardHeader
              className={classes.header}
              action={
                <IconButton
                  aria-label='settings'
                  className={`${classes.subText} ${classes.iconbtn}`}
                >
                  <FontAwesomeIcon icon={faDownload} color={'#9fa6ad'} />
                  <small className={classes.txt}>Download PDF</small>
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader={<SubHeader />}
            />
            <CardContent className={`${classes.details} ${classes.details2}`}>
              <div>
                <Details />
                <Details />
              </div>
              <div>
                <RecordImageSlider />
              </div>
            </CardContent>
          </Card>
        </TimelineContent>
      </TimelineItem>
      <div className={classes.yr}>
        <Typography color='textSecondary' className={classes.year}>
          2021
        </Typography>
      </div>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            className={classes.date}
            style={{ backgroundColor: 'unset' }}
          >
            <Typography variant='body2' color='textSecondary'>
              JAN 28
            </Typography>
          </TimelineDot>
          <TimelineConnector className={classes.connector} />
        </TimelineSeparator>
        <TimelineContent className={classes.content}>
          <Paper elevation={3} className={classes.type}>
            <FastfoodIcon />
            Report
          </Paper>
          <Card className={classes.section}>
            <CardHeader
              className={classes.header}
              action={
                <IconButton
                  aria-label='settings'
                  className={`${classes.subText} ${classes.iconbtn}`}
                >
                  <FontAwesomeIcon icon={faDownload} color={'#9fa6ad'} />
                  <small className={classes.txt}>Download PDF</small>
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader={<SubHeader />}
            />
            <CardContent className={classes.details}>
              <Details />
              <Details />
            </CardContent>
          </Card>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
