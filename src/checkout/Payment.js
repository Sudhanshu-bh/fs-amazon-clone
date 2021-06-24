import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Payment.css'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import { useStateValue } from '../StateProvider'
import CartItem from './CartItem'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { getCartTotal } from '../reducer'
import CurrFormat from '../CurrFormat'
import axios from '../axios'
import { db } from '../firebase'

function Payment() {
  const history = useHistory()

  const [{ cart, user }, dispatch] = useStateValue()

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setsucceeded] = useState(false)
  const [processing, setprocessing] = useState("")
  const [error, seterror] = useState(null)
  const [disabled, setdisabled] = useState(true)

  const [clientSecret, setclientSecret] = useState(true)

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Note: Stripe expects the total in a currency's subunits!
        url: `/payments/create?total=${getCartTotal(cart) * 100}`
      })
      setclientSecret(response.data.clientSecret)
    }

    if (getCartTotal(cart) > 0)
      getClientSecret()
  }, [cart])

  const handleSubmit = async (event) => {

    event.preventDefault()
    setprocessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // paymentIntent = payment confirmation

      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        })

      setsucceeded(true)
      seterror(null)
      setprocessing(false)

      dispatch({
        type: 'EMPTY_CART'
      })
      history.replace('/orders')
    })
  }

  const handleChange = e => {
    setdisabled(e.empty)
    seterror(e.error ? e.error.message : "")
  }

  return (
    <>
      <Header />

      <div className="payment lightgray-bg">

        <h1 className="payment__pageTitle">
          Checkout (
          <Link to="/checkout">{cart?.length} items</Link>
          )
        </h1>

        <div className="payment__container">

          <div className="payment__section">
            <h3 className="payment__title">Delivery Address</h3>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>H-No. 52-A, Adarsh Apartments, Sector-10, Dwarka</p>
              <p>New Delhi, India</p>
            </div>
          </div>

          <div className="payment__section">
            <h3 className="payment__title">Review items and delivery</h3>
            <div className="payment__items">
              {cart.map(item => (
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          <div className="payment__section">
            <h3 className="payment__title">Payment Method</h3>
            <div className="payment__details">

              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />

                <div className="payment__priceContainer">
                  <h3>
                    Order Total:
                    <small> ₹</small>
                    <CurrFormat price={getCartTotal(cart)} />
                  </h3>
                  <button
                    className="am-button"
                    disabled={processing || disabled || succeeded}>
                    {processing ? "Processing" : "Buy Now"}
                  </button>
                </div>

                {error && <div>{error}</div>}
              </form>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Payment
