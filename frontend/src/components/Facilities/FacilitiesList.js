import React from 'react'
import '../styles.css'
import FacilitiesDataList from './FacilitiesDataList'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import FacilitiesModal from './FacilitiesModal'

export default function FacilitiesList() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md' fixed>
        <div
          style={{ backgroundColor: '#F2F4F7', marginTop: 100, height: '80vh' }}
        >
          <Typography
            variant='h5'
            style={{
              paddingLeft: '40px',
              paddingTop: '40px',
              fontWeight: '600',
            }}
          >
            Let's get your records!
          </Typography>
          <Typography
            style={{ paddingLeft: '40px', paddingTop: '20px', fontSize: 18 }}
          >
            Tell us where you've had medical care. Add by doctor or
            facility—whichever is easier!
          </Typography>

          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='center'
            justify='center'
            style={{ minHeight: '30vh' }}
          >
            <FacilitiesModal type='add' />
          </Grid>

          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='center'
            justify='center'
          >
            <FacilitiesDataList />
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  )
}
