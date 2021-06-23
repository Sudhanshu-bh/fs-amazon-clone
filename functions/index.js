const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51J5T7DSIJRW4yvGoOXHUf31ORqHOAzqhQra8HkvDTcIUqeOvb6LrUYjjXV6tuW1D1Kg4e0Op5bxaB9yR51PwhrlY00ApdNsGxR')

// API

// - App config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  })

  // OK - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// - Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/fs--clone/us-central1/api