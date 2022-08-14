import ButtonGroup from '@material-ui/core/ButtonGroup'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API } from 'aws-amplify'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import { Transition } from 'react-transition-group'
import Pay from './Pay'
import Loading from './Loader'


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
    padding: theme.spacing(4, 2, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0, 0)
    }
  },
  iconWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing(1)
  },
  load: {
    marginTop: 100
  },
  contactMe: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.825rem'
    }
  },
  paymentBoxTransition: {
    transition: `all ${fadeDuration}ms ${easingFunction}`,
    position: 'relative'
  },
  payment: {
    composes: '$paymentBoxTransition',
    margin: theme.spacing(5, 0, 3),
    top: 0
  },
  paymentSuccessful: {
    composes: '$paymentBoxTransition',
    margin: theme.spacing(6, 0, 30),
    top: movementDistance
  },
  successIcon: {
    fontSize: 40,
    color: theme.palette.success.light
  },
  mainButton: {
    fontWeight: 700
  }
}))


const prices = {
  oneOnOne: 'price_1Js3dsGTOB4gonZovqxbbDJt',
  group: 'price_1Jo9sgGTOB4gonZogss0zNKt'
}


export default function SignUp ({ specialPrice }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [error, setError] = useState(false)
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const [price, setPrice] = useState(specialPrice || prices.oneOnOne)

  const fieldsState = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const [disablePayment, setDisablePayment] = useState(false)
  const info = fieldsState[0]
  const c = useStyles()


  useEffect(() => {
    setDisablePayment(true)
    API.post('pay', '/getsubscription', {
      body: { price }
    })
      .then(response => {
        setSubscriptionInfo(response)
        setDisablePayment(false)
      })
      .catch(error => setError(error.message))
  }, [price])

  if (!subscriptionInfo && !error) {
    return (
      <div className={c.load}>
        <Loading size={40} color='#000'/>
      </div>
    )
  }

  return (
    <Container className={c.container} maxWidth='xs'>
      {!paymentSuccessful && <ButtonGroup
        fullWidth
        size='large'
        orientation='vertical'
        color='default'
        variant='contained'
      >
        <Button
          className={c.mainButton}
          onClick={() => {setPrice(prices.oneOnOne)}}
          color={price === prices.oneOnOne && 'primary'}
        >
          1-on-1 Exclusive Mentorship - Start Today!
        </Button>
        <Button
          disabled
          onClick={() => {setPrice(prices.group)}}
          color={price === prices.group && 'primary'}
        >
          Small group Mentorship (when available)
        </Button>
        <Button
          component='a'
          href='https://calendly.com/ilya-dorman/code-class'
        >
          Single Class
        </Button>
      </ButtonGroup>}
      <Transition in={!paymentSuccessful} timeout={fadeDuration} unmountOnExit>
        {state => (
          <div
            className={c.payment}
            style={{ ...transitionStylesExit[state] }}
          >
            <Pay
              price={price}
              disablePayment={disablePayment}
              amount={subscriptionInfo.price}
              currency={subscriptionInfo.currency}
              subscription={subscriptionInfo.subscription}
              setPaymentSuccessful={setPaymentSuccessful}
              fields={fieldsState}
              text='Sign up for '
            />
            <Button
              fullWidth
              variant='text'
              component={Link}
              className={c.contactMe}
              to='https://calendly.com/ilya-dorman/student-consultation'
            >
              Still hesitant? Book a free call with me!
            </Button>
          </div>
        )}
      </Transition>
      <Transition in={paymentSuccessful} timeout={fadeDuration} mountOnEnter>
        {state => (
          <div
            className={c.paymentSuccessful}
            style={{ ...transitionStylesEnter[state] }}
          >
            <div className={c.iconWrap}>
              <SuccessIcon className={c.successIcon}/>
            </div>
            <Typography variant='body1'>
              Thank you for subscribing to the mentorship program, {info.first_name}<br/>
              Can't wait for us to start working together!<br/><br/>
              The next step is for you to use <Link
              href='https://calendly.com/ilya-dorman/mentorship-session-60-minutes'>this
              link</Link> and
              schedule our first call. If you have any questions in the meanwhile, don't
              hesitate <Link href='mailto:ilya.dorman@gmail.com'>contacting me</Link>.<br/><br/>
              You will shortly receive an email with an invite to my exclusive Slack group.
            </Typography>
          </div>
        )}
      </Transition>
    </Container>
  )
}

