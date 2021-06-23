import React from 'react'
import { Link } from 'react-router-dom'
import './Payment.css'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import { useStateValue } from '../StateProvider'
import CartItem from './CartItem'

function Payment() {
  const [{ cart, user }] = useStateValue()

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
              {/* Stripe payment will go here */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Payment
