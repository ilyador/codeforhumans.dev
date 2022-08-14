const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


const apiKey = process.env.ZOOM_KEY
const apiSecret = process.env.ZOOM_SECRET
const expirationDate = 60 * 60 * 24 // one day


const payload = {
  iss: apiKey,
  exp: ((new Date()).getTime() + expirationDate)
}

const URLs = {
  meetings: 'https://api.zoom.us/v2/meetings/'
}


app.post('/getmeeting', async function (req, res) {

  if (!req.body.meetingId) {
    res.status(500).json({ message: 'No meeting ID' })
  }

  const token = jwt.sign(payload, apiSecret)

  try {
    const response = await axios({
      method: 'get',
      url: URLs.meetings + req.body.meetingId,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const { topic, agenda, start_time, timezone } = response.data
    res.json({ topic, agenda, start_time, timezone })
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.data.message })
  }
})



app.post('/addmeeting', async function (req, res) {

  if (!req.body.meetingId || !req.body.info) {
    res.status(500).json({ message: 'No meeting or user info' })
  }

  const token = jwt.sign(payload, apiSecret)

  try {
    const response = await axios({
      method: 'post',
      url: URLs.meetings + req.body.meetingId + '/registrants',
      data: req.body.info,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    res.json({ message: 'You have been successfully registered!' })
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.data.message })
  }
})



app.listen(3000, function () {
  console.log('App started')
})

module.exports = app
