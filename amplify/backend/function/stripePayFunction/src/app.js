const express = require('express')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const app = express()
require('dotenv').config()

app.use(awsServerlessExpressMiddleware.eventContext())
app.use(express.json())
app.use(cors())


app.post('/pay', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: 'eur'
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.post('/subscribe', async (req, res) => {

  const { email, name, paymentMethodId, price } = req.body

  try {
    const customerResponse = await stripe.customers.create({ email, name })
    const customer = customerResponse.id

    await stripe.paymentMethods.attach(paymentMethodId, { customer })

    await stripe.customers.update(customer, {
      invoice_settings: { default_payment_method: paymentMethodId }
    })

    await stripe.subscriptions.create({
      customer,
      items: [{ price }]
    })

    res.send({
      status: 'GREAT SUCCESS'
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.post('/getsubscription', async (req, res) => {

  try {
    const priceResponse = await stripe.prices.retrieve(req.body.price)
    const { product, unit_amount, currency, type } = priceResponse

    const productResponse = await stripe.products.retrieve(product)
    const { name, description } = productResponse

    res.send({
      name,
      description,
      price: unit_amount/100,
      currency,
      subscription: (type === "recurring")
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.listen(3000, function () {
  console.log('App started')
})

module.exports = app
