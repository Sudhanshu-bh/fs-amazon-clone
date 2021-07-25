import React from 'react'
import './CartItem.css'
import { useStateValue } from '../StateProvider'
import CurrFormat from '../CurrFormat';
import { INCREASE_QTY, DECREASE_QTY, REMOVE_FROM_CART } from '../actionsList'

function CartItem({ id, title, image, price, rating, quantity, hideButtons, removeBorder }) {

  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: id,
    })
  }

  const increaseQty = () => {
    dispatch({
      type: INCREASE_QTY,
      id: id
    })
  }

  const decreaseQty = () => {
    if (quantity === 1)
      return

    dispatch({
      type: DECREASE_QTY,
      id: id
    })
  }

  return (
    <div className={`cartItem ${removeBorder && "removeBottomBorder"}`}>
      <img
        className="cartItem__left"
        src={image}
        alt="Cart item"
      />
      <div className="cartItem__middle">
        <p className="cartItem__title">{title}</p>

        <div className="cartItem__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))
          }
        </div>

        {!hideButtons && (
          <div className="cartItem__giftOption">
            <input type="checkbox" />
            <small>&nbsp; This will be a gift</small>
          </div>
        )}

        <div className="cartItem__quantity">
          {!hideButtons ? (
            <>
              Qty:
              <div className="cartItem__quantityCounter">
                <div className={`cartItem__buttons ${quantity === 1 && "disabled"}`} onClick={decreaseQty}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </div>
                <div className="cartItem__buttons" id="quantityNumber">{quantity}</div>
                <div className="cartItem__buttons" onClick={increaseQty}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
              </div>
            </>
          )
            :
            (
              <>
                Quantity:
                <div className="" id="quantityNumber">&nbsp;{quantity}</div>
              </>
            )}

          {!hideButtons && (
            <div className="cartItem__deleteOuter">
              <div
                className="cartItem__deleteButton"
                onClick={removeFromCart}>
                Delete
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="cartItem__right">
        <p>
          <small>₹</small>
          <strong>
            <CurrFormat price={price} />
          </strong>
        </p>
      </div>
    </div>
  )
}

export default CartItem