import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Pay from '../components/Pay'


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7)
  }
}))


export default function Payment ({ amount }) {

  const fieldsState = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  const c = useStyles()

  return (
    <Container className={c.container} maxWidth="xs">
      <Pay
        amount={amount}
        fields={fieldsState}
        text='Pay Securely'
      />
    </Container>
  )
}

