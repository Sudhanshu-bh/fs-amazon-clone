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
import Toast from '../reusable/Toast'

let shippingName = "", mobile = "", pincode = "", area = "", city = "", state = ""
let address

function Payment() {
  const history = useHistory()

  const [{ cart, user }, dispatch] = useStateValue()

  if (cart.length === 0)
    history.push('/')

  const stripe = useStripe()
  const elements = useElements()

  const [NameEmpty, setNameEmpty] = useState("")
  const [MobileEmpty, setMobileEmpty] = useState("")
  const [PincodeEmpty, setPincodeEmpty] = useState("")
  const [AreaEmpty, setAreaEmpty] = useState("")
  const [CityEmpty, setCityEmpty] = useState("")
  const [StateEmpty, setStateEmpty] = useState("")
  const [toast, settoast] = useState({})

  const reqMessage = "This field is required."

  const [succeeded, setsucceeded] = useState(false)
  const [processing, setprocessing] = useState("")
  const [error, seterror] = useState(null)
  const [disabled, setdisabled] = useState(true)

  const [clientSecret, setclientSecret] = useState(true)

  const updateAddress = e => address = area + ", " + city + "-" + pincode + ", " + state;

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

    if (shippingName === "" || mobile === "" || pincode === "" || area === "" || city === "" || state === "") {
      event.preventDefault()
      settoast({ text: "Please fill all the required fields!", type: "danger" })
      return
    }

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
          shippingDetails: {
            shippingName: shippingName,
            mobile: mobile,
            address: address
          }
        })

      setsucceeded(true)
      seterror(null)
      setprocessing(false)

      dispatch({
        type: EMPTY_CART
      })
      history.replace('/user/orders')
    })
  }

  const handleChange = e => {
    seterror(e.error ? e.error.message : "")
    setdisabled(e.empty)
  }

  return (
    <>
      <Header />

      <div className="payment lightgray-bg">

        <h1 className="payment__pageTitle">
          Checkout (
          <Link to="/checkout">{cart?.reduce((size, item) => item.quantity + size, 0)} items</Link>
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
                  image={item.imageUrl}
                  price={item.sellprice}
                  rating={parseInt(item.rating)}
                  quantity={item.quantity}
                  hideButtons
                  removeBorder
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
                  <div className="inputRow">
                    <span>Name : </span>
                    <input type="text" name="name" onChange={e => { shippingName = e.target.value; setNameEmpty("") }} onBlur={e => e.target.value === "" && setNameEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{NameEmpty}</div>
                  </div>
                </div>
                <div className="inputSection">
                  <div className="inputRow">
                    <span>Mobile number : </span>
                    <input type="text" name="mobile" onChange={e => { mobile = e.target.value; setMobileEmpty("") }} onBlur={e => e.target.value === "" && setMobileEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{MobileEmpty}</div>
                  </div>
                </div>
                <div className="inputSection">
                  <div className="inputRow">
                    <span>Pincode : </span>
                    <input type="text" name="pincode" onChange={e => { pincode = e.target.value; setPincodeEmpty(""); updateAddress(e) }} onBlur={e => e.target.value === "" && setPincodeEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{PincodeEmpty}</div>
                  </div>
                </div>
                <div className="inputSection">
                  <div className="inputRow">
                    <span>Area and Street : </span>
                    <input type="text" name="area" onChange={e => { area = e.target.value; setAreaEmpty(""); updateAddress(e) }} onBlur={e => e.target.value === "" && setAreaEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{AreaEmpty}</div>
                  </div>
                </div>
                <div className="inputSection">
                  <div className="inputRow">
                    <span>City/District/Town : </span>
                    <input type="text" name="city" onChange={e => { city = e.target.value; setCityEmpty(""); updateAddress(e) }} onBlur={e => e.target.value === "" && setCityEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{CityEmpty}</div>
                  </div>
                </div>
                <div className="inputSection">
                  <div className="inputRow">
                    <span>State : </span>
                    <input type="text" name="state" onChange={e => { state = e.target.value; setStateEmpty(""); updateAddress(e) }} onBlur={e => e.target.value === "" && setStateEmpty(reqMessage)} required />
                  </div>
                  <div className="inputRow">
                    <div className="renderHelper"></div>
                    <div>{StateEmpty}</div>
                  </div>
                </div>

              </div>
            </div>


            <div className="payment__section payment__card">
              <h3 className="payment__title">Payment Method</h3>
              <div className="payment__details">

                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />
                  <div className="payment__cardError">{error}&nbsp;</div>

                  <div className="payment__priceContainer">
                    <h5>
                      <span className="payment__totalTag">Order Total:</span>
                      <small> ₹</small>
                      <CurrFormat price={getCartTotal(cart)} />
                    </h5>
                    <button
                      className="am-button"
                      disabled={processing || disabled || succeeded}>
                      {processing ? "Processing" : "Buy Now"}
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Payment
