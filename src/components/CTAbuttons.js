import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(7, 0, 0)
  },
  main:{
    marginBottom: theme.spacing(1),
    fontWeight: 600
  },
  highlight: {
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  consultation: {
    fontSize: 18,
    padding: theme.spacing(0, 10, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0, 2)
    }
  },
  or: {
    margin: '10px !important',
    fontWeight: 300
  },
  linkToChat: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  call: {
    fontWeight: 700
  }
}))


export default function CTA(){
  const c = useStyles()

  return (
    <div className={c.container}>
      <Button
        fullWidth
        className={c.main}
        color='primary'
        variant='contained'
        component={Link}
        to='/mentorship'
      >
        Learn With Me!
      </Button>
      {/*<Typography variant='body1' align='center' className={c.or}>*/}
      {/*  OR*/}
      {/*</Typography>*/}
      {/*<Typography variant='body1' align='center' className={c.consultation}>*/}
      {/*  <a*/}
      {/*    href='https://calendly.com/ilya-dorman/student-consultation'*/}
      {/*    className={c.linkToChat}*/}
      {/*  >Book a <span className={c.highlight}>free chat</span> with me so we can discuss <span*/}
      {/*    className={c.highlight}>exactly how I’d help you bring your project to life. Ask me anything</span> about*/}
      {/*    my mentorship program:</a>*/}
      {/*</Typography>*/}
      {/*<Button*/}
      {/*  fullWidth*/}
      {/*  variant='outlined'*/}
      {/*  component={Link}*/}
      {/*  className={c.call}*/}
      {/*  to='https://calendly.com/ilya-dorman/student-consultation'*/}
      {/*>*/}
      {/*  Let's Chat!*/}
      {/*</Button>*/}
    </div>
  )
}