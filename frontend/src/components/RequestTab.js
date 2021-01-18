import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import AllRequestsTab from './AllRequestsTab'
import AllOpenRequestsTab from './AllOpenRequestsTab'
import RequestDataList from './RequestDataList'
import OpenRequestDataList from './OpenRequestDataList'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function LabTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md' fixed>
        <div className={classes.root}>
          <TabContext value={value}>
            <AppBar
              position='static'
              style={{ backgroundColor: '#fff', color: '#6dcdb1' }}
            >
              <TabList
                onChange={handleChange}
                aria-label='simple tabs example'
                TabIndicatorProps={{ style: { backgroundColor: '#6dcdb1' } }}
              >
                <Tab label='All Requests' value='1' />
                <Tab label='Open Requests' value='2' />
              </TabList>
            </AppBar>
            <TabPanel value='1'>
              <AllRequestsTab />
              <RequestDataList />
            </TabPanel>
            <TabPanel value='2'>
              <AllOpenRequestsTab />
              <OpenRequestDataList />
            </TabPanel>
          </TabContext>
        </div>
      </Container>
    </React.Fragment>
  )
}
