import React from 'react'
import './Order.css'
import moment from 'moment'
import CartItem from '../checkout/CartItem'
import CurrFormat from '../CurrFormat'

function Order({ order, number }) {
  return (
    <div className="order">
      <h2>Order #{number}
        <small className="order__id"> ({order.id})</small>
      </h2>
      <p className="order__date">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      {order.data.cart?.map(item => (
        <CartItem
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButtons
        />
      ))}

      <h3 className="order__total">
        Order Total:
        <small> ₹</small>
        <CurrFormat price={order.data.amount / 100} />
      </h3>

    </div>
  )
}

export default Order
