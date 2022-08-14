import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Transition } from 'react-transition-group'
import SyncIcon from '@material-ui/icons/Public'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import FailIcon from '@material-ui/icons/Cancel'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'


const duration = 300

const easingFunction = 'linear'

const defaultStyle = {
  transition: `transform ${duration}ms ${easingFunction}`,
  transform: 'rotateY(90deg)',
  alignSelf: 'center',
  position: 'absolute'
}

const transitionStyles = {
  entering: { transform: 'rotateY(90deg)' },
  entered: { transform: 'rotateY(0deg)' },
  exiting: { transform: 'rotateY(90deg)' },
  exited: { transform: 'rotateY(90deg)' },
}


const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: props => ({
    fontSize: props.size
  }),
  loadingIcon: props => ({
    composes: '$icon',
    animation: 'rotating 2s linear infinite',
    color: props.color
  }),
  successIcon: props => ({
    composes: '$icon',
    color: theme.palette.success.light
  }),
  failIcon: props => ({
    composes: '$icon',
    color: theme.palette.error.light
  }),
  alert: {
    height: 'fit-content',
    alignSelf: 'flex-end',
    margin: theme.spacing(3),
  }
}))


function Loader ({ size = 24, color = '#fff', state: processingState = 'loading', text, close }) {
  const c = useStyles({ size: Number(size), color })

  const loading = processingState === 'loading'
  const success = processingState === 'success'
  const fail = processingState === 'fail'

  return (
    <div className={c.wrapper}>
      <Transition in={loading} timeout={duration} mountOnEnter unmountOnExit>
        {state => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <SyncIcon className={c.loadingIcon} />
          </div>
        )}
      </Transition>
      <Transition in={success} timeout={duration} mountOnEnter unmountOnExit>
        {state => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <SuccessIcon className={c.successIcon} />
          </div>
        )}
      </Transition>
      <Transition in={fail} timeout={duration} mountOnEnter unmountOnExit>
        {state => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <FailIcon className={c.failIcon} />
          </div>
        )}
      </Transition>
      {text &&
        <Alert severity={(success) ? 'success' : 'error'} className={c.alert}
          action={
            <Button color='inherit' size='small' onClick={() => { close() }}>
              {(success) ? 'OK' : 'Retry'}
            </Button>
          }
        >
          {text}
        </Alert>
      }
    </div>
  )
}

export default Loader
