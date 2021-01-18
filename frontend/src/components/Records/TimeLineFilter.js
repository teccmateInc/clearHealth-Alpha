import React from 'react'
import { useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#6dcdb1' },
  },
  theme: {
    overrides: {
      MuiPickersToolbar: {
        root: {
          color: 'white',
        },
      },
    },
  },
})

export default function TimeLineFilter({ classes }) {
  const location = useLocation().pathname
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
    console.log(date)
  }

  return (
    <>
      {location !== '/Timeline' ? (
        ''
      ) : (
        <AppBar position='static' className={classes.timelinebar}>
          <Toolbar variant='dense'>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <ThemeProvider theme={defaultTheme}>
                  <KeyboardDatePicker
                    // disableToolbar
                    margin='normal'
                    id='date-picker-dialog'
                    label='Date'
                    inputVariant='outlined'
                    views={['year', 'month', 'date']}
                    format='MMMM dd yyyy'
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </ThemeProvider>
              </Grid>
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}
