import React from 'react'
import './CartItem.css'

function CartItem({ id, title, image, price, rating }) {
  return (
    <div className="cartItem">
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

        <div className="cartItem__giftOption">
          <input type="checkbox" />
          <small>&nbsp; This will be a gift</small>
        </div>

        <button className="am-yellow-button cartItem__deleteButton">Remove from Cart</button>
      </div>

      <div className="cartItem__right">
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
    </div>
  )
}

export default CartItem