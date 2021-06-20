import React from 'react'
import './Checkout.css'
import CartItem from './CartItem'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import { getCartTotal } from './reducer'

function Checkout() {
  const [{ cart }, dispatch] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Ad"
        />


        <div className="checkout__cartBox">
          <div className="checkout__title">
            <h1>Shopping Cart</h1>
            <div className="checkout__priceTag">
              <small>Price</small>
            </div>
          </div>

          {cart.map(item => (
            <CartItem
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

          <div className="checkout__leftSubtotal">
            Subtotal ({cart.length} items):
            <small> ₹</small>
            <strong>{getCartTotal(cart)}</strong>
          </div>

        </div>
      </div>
      <div className="checkout__right">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
          alt=""
        />
        <Subtotal />
      </div>

    </div>
  )
}

export default Checkout
