import { TextField, InputAdornment, Grid, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'

export default function AllRequestsTab() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant='outlined'
          placeholder='Search By Facility Or Provider'
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          style={{ backgroundColor: '#6dcdb1', color: '#fff', height: '100%' }}
        >
          <AddBoxIcon />
          &nbsp;&nbsp;Start New Request
        </Button>
      </Grid>
    </Grid>
  )
}
