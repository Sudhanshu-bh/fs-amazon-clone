import React from 'react'
import { useHistory } from 'react-router-dom'
import './Subtotal.css'
import { useStateValue } from '../StateProvider'
import { getCartTotal } from '../reducer'
import CurrFormat from '../CurrFormat'

function Subtotal() {

  const history = useHistory()
  const [{ cart }] = useStateValue()

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items):
        <small> ₹</small>
        <strong>
          <CurrFormat price={getCartTotal(cart)} />
        </strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      <button
        className="am-yellow-button subtotal__buyButton"
        onClick={e => history.push("/payment")}
        disabled={getCartTotal(cart) === 0 ? true : false}>
        Proceed to Buy
      </button>
    </div>
  )
}

export default Subtotal
