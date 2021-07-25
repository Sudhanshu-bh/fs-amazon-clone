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
import { EMPTY_CART } from '../actionsList'

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

  // eslint-disable-next-line
  let name, mobile, pincode, area, city, state
  let address

  const updateAddress = () => {
    address = area + ", " + city + "-" + pincode + ", " + state
    console.log(address)
  }

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

    // eslint-disable-next-line
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
          // address: 
        })

      setsucceeded(true)
      seterror(null)
      setprocessing(false)

      dispatch({
        type: EMPTY_CART
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


          <div className="payment__section payment__reviewItems">
            <h3 className="payment__title">Review items and delivery</h3>
            <div className="payment__items">
              {cart.map(item => (
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  quantity={item.quantity}
                  hideButtons
                />
              ))}
            </div>
          </div>

          <div className="payment__bottom">
            <div className="payment__section payment__address">
              <h3 className="payment__title">Delivery Address</h3>
              <div>
                <p>{user?.email}</p>

                <div className="inputSection">
                  <span>Name : </span>
                  <input type="text" name="name" onChange={e => name = e.target.value} />
                </div>
                <div className="inputSection">
                  <span>Mobile number : </span>
                  <input type="text" name="mobile" onChange={e => mobile = e.target.value} />
                </div>
                <div className="inputSection">
                  <span>Pincode : </span>
                  <input type="text" name="pincode" onChange={e => { pincode = e.target.value; updateAddress() }} />
                </div>
                <div className="inputSection">
                  <span>Area and Street : </span>
                  <input type="text" name="area" onChange={e => { area = e.target.value; updateAddress() }} />
                </div>
                <div className="inputSection">
                  <span>City/District/Town : </span>
                  <input type="text" name="city" onChange={e => { city = e.target.value; updateAddress() }} />
                </div>
                <div className="inputSection">
                  <span>State : </span>
                  <input type="text" name="state" onChange={e => { state = e.target.value; updateAddress() }} />
                </div>

              </div>
            </div>


            <div className="payment__section payment__card">
              <h3 className="payment__title">Payment Method</h3>
              <div className="payment__details">

                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />

                  <div className="payment__priceContainer">
                    <h5>
                      Order Total:
                      <small> ₹</small>
                      <CurrFormat price={getCartTotal(cart)} />
                    </h5>
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
      </div>

      <Footer />
    </>
  )
}

export default Payment
