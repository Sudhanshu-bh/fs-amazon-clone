const functions = require("firebase-functions");
const admin = require("firebase-admin")
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51J5T7DSIJRW4yvGoOXHUf31ORqHOAzqhQra8HkvDTcIUqeOvb6LrUYjjXV6tuW1D1Kg4e0Op5bxaB9yR51PwhrlY00ApdNsGxR")

// API

// - App config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get("/", (req, res) => res.status(200).send("hello world"))

app.post("/payments/create", async (req, res) => {
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

app.post("/addcustomclaim/admin", (req, res) => {
  admin.initializeApp();

  let status = -1;

  (async (email) => {
    const user = await admin.auth().getUserByEmail(email)
    if (user.customClaims && user.customClaims.admin === true) {
      status = 0
      return;
    }
    admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    }).then(() => {
      status = 1
      return;
    }).catch(console.log("Something went wrong!"))
  })(req.body.email);

  if (status === 1) {
    res.status(201).send({
      status: "Admin custom claim added successfully."
    })
  } else if (status === 0) {
    res.status(200).send({
      status: "Admin custom claim is already present in this user token."
    })
  } else if (status === -1) {
    res.status(500).send({
      status: "Something went wrong!!"
    })
  }
})

// - Listen command
exports.api = functions.https.onRequest(app)