import React from 'react'
import './Subtotal.css'
import { useStateValue } from '../StateProvider'
import { getCartTotal } from '../reducer'

function Subtotal() {

  const [{ cart }] = useStateValue()

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items):
        <small> ₹</small>
        <strong>{getCartTotal(cart)}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      <button className="am-yellow-button subtotal__buyButton">Proceed to Buy</button>
    </div>
  )
}

export default Subtotal
