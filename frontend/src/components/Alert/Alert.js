import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function Alerts({
  type = 'error',
  title = null,
  msg,
  impNote = null,
}) {
  const classes = useStyles()
  //   console.log(impNote)
  return (
    <div className={classes.root}>
      <Alert severity={type}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {impNote ? (
          <>
            {msg} — <strong>impNote</strong>{' '}
          </>
        ) : (
          msg
        )}
      </Alert>
    </div>
  )
}
