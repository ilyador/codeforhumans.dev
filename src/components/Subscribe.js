import { useMediaQuery } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API } from 'aws-amplify'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
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
  title: {
    margin: '1em 0'
  },
  iconWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing(1)
  },
  load: {
    marginTop: 100
  },
  priceOptions: {
    margin: theme.spacing(6, 0)
  },
  buttonMobile: {
    fontSize: '0.8375rem'
  },
  paymentBoxTransition: {
    transition: `all ${fadeDuration}ms ${easingFunction}`,
    position: 'relative'
  },
  payment: {
    composes: '$paymentBoxTransition',
    margin: theme.spacing(4, 0, 3),
    top: 0
  },
  contactMe: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.825rem'
    }
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
  classes: {
    marginBottom: -18
  },
  fieldset: {
    top: -8
  }
}))


const priceOptions = [
  {
    title: '1 month trial €400 - 50% off!',
    price: 'price_1I5vqIGTOB4gonZoTl0B2q0T'
  },
  {
    title: '€800 monthly subscription',
    price: 'price_1I5vpqGTOB4gonZoXNE2a6PW'
  },
  {
    title: '3 months discount €2160 - 10% off',
    price: 'price_1I5vqdGTOB4gonZo5SFshIJe'
  },
  {
    title: '6 months discount €3840 - 20% off',
    price: 'price_1I5vrDGTOB4gonZoKrtPcN3D'
  }
]


export default function Subscription ({ specialPrice }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [error, setError] = useState(false)
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const fieldsState = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const [disablePayment, setDisablePayment] = useState(false)
  const [price, setPrice] = React.useState(specialPrice || priceOptions[0].price)
  const info = fieldsState[0]
  const mobile = useMediaQuery('(max-width:600px)')
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
      <Typography variant='body1' gutterBottom>
        Monthly subscription to Code For Humans 1-on-1 mentorship.
      </Typography>
      <Typography variant='body1' gutterBottom>
        In this program you will learn web development: HTML, CSS, JavaScript, React, Node.js,
        using APIs, Github and more.
      </Typography>
      <Typography variant='body1' gutterBottom>
        The program is based on my unique teaching approach: <strong>Zen Development</strong>:
        Quickly & stress-free helping you get the results you are passionate about.
      </Typography>
      <Typography variant='body1' gutterBottom>
        The program includes:
        <ul>
          <li><strong>Unlimited</strong> one-on-one support over Zoom.</li>
          <li>Daily support in the exclusive Slack group.</li>
          <li>Recordings of some of the previous classes.</li>
          <li>Curated resources to speed up your learning.</li>
        </ul>
      </Typography>

      {!specialPrice && <div className={c.priceOptions}>
        <Typography variant='h5' align='center' gutterBottom>
          Pricing Options
        </Typography>
        <ButtonGroup
          fullWidth
          orientation='vertical'
          variant='contained'
          size='large'
        >
          {priceOptions.map((option, index) => (
            <Button
              classes={{ containedSizeLarge: mobile && c.buttonMobile }}
              key={index}
              color={(index === priceOptions.findIndex(item => item.price === price)) ? 'primary' : 'default'}
              onClick={() => { setPrice(option.price)}}
            >
              {option.title}
            </Button>
          ))}
        </ButtonGroup>

        <Button
          fullWidth
          variant='text'
          component={Link}
          className={c.contactMe}
          to='https://calendly.com/ilya-dorman/student-consultation'
        >
          Still hesitant? Book a free call with me!
        </Button>
      </div>}

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
              text='Subscribe for '
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

