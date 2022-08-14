import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import moment from 'moment-timezone'
import { makeStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import Loading from '../components/Loader'
import Pay from '../components/Pay'
import Countdown from '../components/Countdown'
import me from '../img/ilya-low-rez.jpg'
import zoom from '../img/zoom.png'


const fadeDuration = 1000
const movementDistance = 1500
const easingFunction = 'ease-in-out'


const transitionStylesExit = {
  entering: { top: 0 },
  entered: { top: 0 },
  exiting: { top: movementDistance },
  exited: { top: movementDistance }
}

const transitionStylesEnter = {
  entering: { top: movementDistance },
  entered: { top: 0 },
  exiting: { top: 0 },
  exited: { top: movementDistance }
}


const useStyles = makeStyles(theme => ({
  container: {
    padding: [theme.spacing(10), theme.spacing(2)]
  },
  header: {
    display: 'flex',
    marginBottom: theme.spacing(4)
  },
  picture: {
    display: 'block',
    flex: [0, 0, '70px'],
    position: 'relative',
    height: 70,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1) / 2
  },
  me: {
    borderRadius: '50%'
  },
  zoom: {
    width: 26,
    position: 'absolute',
    bottom: -1,
    right: 0
  },
  headerText: {
    flex: 1
  },
  load: {
    marginTop: 100
  },
  time: {
    display: 'inline-block',
    lineHeight: 1.5
  },
  successIcon: {
    fontSize: 40,
    color: theme.palette.success.light
  },
  paymentBoxTransition: {
    transition: `all ${fadeDuration}ms ${easingFunction}`,
    position: 'relative'
  },
  payment: {
    composes: '$paymentBoxTransition',
    margin: [theme.spacing(4), 0],
    top: 0
  },
  paymentSuccessful: {
    composes: '$paymentBoxTransition',
    textAlign: 'center',
    margin: [theme.spacing(6), 0, theme.spacing(30)],
    top: movementDistance
  }
}))


export default function Payment ({ meetingId, product }) {

  const fieldsState = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const info = fieldsState[0]

  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const [meeting, setMeeting] = useState(null)
  const [price, setPrice] = useState(product)
  const [error, setError] = useState(null)
  const c = useStyles()


  useEffect(() => {
    API.post('zoom', '/getmeeting', { body: { meetingId } })
      .then(setMeeting)
      .catch(error => setError(error.response.data.message))

    API.post('pay', '/getsubscription', {
      body: { price: product }
    })
      .then(data => {setPrice(data.price)})
      .catch(error => setError(error.response.data.message))
  }, [])


  useEffect(() => {
    if (paymentSuccessful) {
      API.post('zoom', '/addmeeting', { body: { meetingId, info } })
        .then(console.log)
        .catch(error => setError(error.response.data.message))
    }
  }, [paymentSuccessful])


  const displayTime = () => {
    const localTimezone = moment.tz.guess()

    const formattedTime = moment(meeting.start_time)
      .tz(meeting.timezone)
      .tz(localTimezone)
      .format('H:mm a ddd, MMMM Do')

    const unixEvent = moment(meeting.start_time)
      .tz(meeting.timezone)
      .tz(localTimezone)
      .format('x')

    const unixNow = moment().format('x')

    return {
      date: `Zoom group class | ${formattedTime} | ${localTimezone} time`,
      countdown: unixEvent - unixNow
    }
  }

  if (!meeting && !error) return (
    <div className={c.load}>
      <Loading size={40} color='#000'/>
    </div>
  )

  if (error) return (<h1>{error}</h1>)


  return (
    <Container className={c.container} maxWidth="sm">
      <div className={c.header}>
        <a href="/" className={c.picture}>
          <img className={c.me} src={me} alt="Ilya Dorman"/>
          <img className={c.zoom} src={zoom} alt="Zoom logo"/>
        </a>
        <div className={c.headerText}>
          <Typography variant="h4" gutterBottom>
            {meeting.topic}
          </Typography>
          <Typography variant="overline" className={c.time} gutterBottom>
            {displayTime().date}
          </Typography>
        </div>
      </div>
      <Typography variant="body1" gutterBottom>
        <div dangerouslySetInnerHTML={{ __html: meeting.agenda }}/>
      </Typography>

      <Countdown time={displayTime().countdown}/>

      <Transition in={!paymentSuccessful} timeout={fadeDuration} unmountOnExit>
        {state => (
          <div
            className={c.payment}
            style={{ ...transitionStylesExit[state] }}
          >
            <Pay
              amount={price}
              fields={fieldsState}
              setPaymentSuccessful={setPaymentSuccessful}
              text='Register for only'
            />
          </div>
        )}
      </Transition>
      <Transition in={paymentSuccessful} timeout={fadeDuration} mountOnEnter>
        {state => (
          <div
            className={c.paymentSuccessful}
            style={{ ...transitionStylesEnter[state] }}
          >
            <SuccessIcon className={c.successIcon}/>
            <Typography variant="h4">
              Thank you for registering, {info.first_name}!
            </Typography>
            <Typography variant="h6">
              You will shortly receive an email with all the details.
            </Typography>
          </div>
        )}
      </Transition>
    </Container>
  )
}
