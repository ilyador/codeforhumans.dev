import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'
import CssBaseline from '@material-ui/core/CssBaseline'
import CookieConsent from 'react-cookie-consent'
import 'typeface-cormorant-garamond'
import 'typeface-open-sans'
import 'typeface-poppins'
import '../styles/index.scss'


Amplify.configure(awsconfig)
const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY)


const theme = createTheme({
  palette: {
    primary: {
      main: '#d2232a',
    }
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(',')
  },
})


export default function Wrapper({children}){
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="gatsby-gdpr-google-analytics"
          >
            This site uses cookies ...
          </CookieConsent>
        {children}
      </ThemeProvider>
    </Elements>
  )
}
