import React, { useState } from 'react'
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { API } from 'aws-amplify'
import { Transition } from 'react-transition-group'
import Loading from './Loader'
import stripeLogo from '../img/stripe-logo.svg'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/Lock'
import SecuredIcon from '@material-ui/icons/VerifiedUser'
import SyncIcon from '@material-ui/icons/Sync'


function numberWithCommas (num) {
  return num && num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


const fadeDuration = 600
const easingFunction = 'ease-in-out'


const symbol = {
  eur: '€',
  usd: '$'
}


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: [0, 'auto']
  },
  modal: {
    padding: theme.spacing(2),
    position: 'relative'
  },
  form: processing => ({
    transition: `${fadeDuration}ms filter ${easingFunction}`,
    filter: (processing) ? 'blur(1px)' : 'none'
  }),
  name: {
    display: 'flex'
  },
  field: {
    flex: 1
  },
  stripeCard: {
    margin: theme.spacing(4, 0, 5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid #949494'
  },
  securedIcon: {
    color: '#32325d',
    marginRight: 6,
    fontSize: 20
  },
  secureWrap: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  securePayment: {
    fontSize: 14,
    color: '#32325d',
    paddingTop: 2
  },
  stripeLogo: {
    width: 68
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.55)',
    borderRadius: theme.shape.borderRadius
  },
  loadingIcon: {
    marginRight: theme.spacing(1),
    animation: 'rotating 2s linear infinite'
  },
}))


const stripeOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Roboto, sans-serif'
    }
  }
}


const defaultStyle = {
  transition: `opacity ${fadeDuration}ms ${easingFunction}`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}


export default function Pay ({
  price,
  currency = 'eur',
  subscription,
  amount,
  fields,
  setPaymentSuccessful,
  text,
  disablePayment
}) {
  const [userInfo, setUserInfo] = fields
  const [processing, setProcessing] = useState(false)
  const [processingState, setProcessingState] = useState(null)
  const [response, setResponse] = useState(null)
  const stripe = useStripe()
  const elements = useElements()
  const c = useStyles(processing)


  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setUserInfo(oldForm => ({ ...oldForm, [name]: value }))
  }

  const clearState = () => {
    setProcessing(false)
    setProcessingState(null)
    setResponse(null)
  }


  const subscribe = async () => {
    setProcessing(true)
    setProcessingState('loading')

    try {
      const response = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      const { error, paymentMethod } = response

      if (error) throw new Error(error.message)

      await API.post('pay', '/subscribe', {
        body: {
          name: userInfo.first_name + ' ' + userInfo.last_name,
          email: userInfo.email,
          paymentMethodId: paymentMethod.id,
          price
        }
      })

      setProcessingState('success')
      if (typeof setPaymentSuccessful === 'function') {
        setPaymentSuccessful(true)
      }
      setResponse('Thank you, your subscription was successful.')
    } catch (error) {
      setProcessingState('fail')
      setResponse(error.message)
    }
  }


  const pay = async () => {
    setProcessing(true)
    setProcessingState('loading')

    try {
      let response = await API.post('pay', '/pay', {
        body: { amount }
      })

      let secret = response.clientSecret

      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userInfo.first_name + ' ' + userInfo.last_name,
            email: userInfo.email
          }
        }
      })

      if (result.error) throw new Error(result.error.message)

      else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('GREAT SUCCESS')
          setProcessingState('success')
          if (typeof setPaymentSuccessful === 'function') {
            setPaymentSuccessful(true)
          }
          setResponse('Thank you, your payment was successful.')
        }
      }
    } catch (error) {
      setProcessingState('fail')
      setResponse(error.message)
    }
  }


  const handleSubmit = event => {
    event.preventDefault()

    if (subscription) subscribe()
    else pay()
  }


  return (
    <Paper className={c.modal} elevation={5}>
      <form className={c.form} onSubmit={handleSubmit}>
        <div className={c.name}>
          <TextField
            required
            className={c.field}
            margin='normal'
            label='First Name'
            name='first_name'
            value={userInfo.first_name}
            onChange={handleChange}
          />
          <TextField
            required
            className={c.field}
            margin='normal'
            label='Last Name'
            name='last_name'
            value={userInfo.last_name}
            onChange={handleChange}
          />
        </div>
        <TextField
          required
          fullWidth
          margin='normal'
          label='Email'
          name='email'
          value={userInfo.email}
          onChange={handleChange}
        />
        <CardElement className={c.stripeCard} options={stripeOptions}/>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          type='submit'
          size='large'
          startIcon={!disablePayment && <LockIcon/>}
          disabled={!stripe || processing || disablePayment}
        >
          {disablePayment ?
            <SyncIcon className={c.loadingIcon} /> :
            `${text} ${symbol[currency]}${numberWithCommas(amount)}${(subscription) ? '/Month' : ''}`
          }
        </Button>
        <div className={c.secureWrap}>
          <SecuredIcon className={c.securedIcon}/>
          <span className={c.securePayment}>SSL-secured payment with</span>
          <img className={c.stripeLogo} src={stripeLogo} alt='stripe'/>
        </div>
      </form>
      <Transition in={processing} timeout={fadeDuration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {processing && <div className={c.loading}>
              <Loading
                size='60'
                state={processingState}
                text={response}
                close={clearState}
              />
            </div>}
          </div>
        )}
      </Transition>
    </Paper>
  )
}
