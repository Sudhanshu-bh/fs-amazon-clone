import React from 'react'
import './Order.css'
import moment from 'moment'
import CartItem from '../checkout/CartItem'
import CurrFormat from '../CurrFormat'

function Order({ order, number }) {
  return (
    <div className="order">
      <h3>Order #{number}
        <small className="order__id"> ({order.id})</small>
      </h3>

      <p className="order__date">Order Date: {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>

      <div className="order__address">
        <h5>Delivery Address</h5>
        <div>
          <span>Name :</span>
          {order.data.shippingDetails.shippingName}
        </div>
        <div>
          <span>Phone number :</span>
          {order.data.shippingDetails.mobile}
        </div>
        <div>
          <span>Address :</span>
          {order.data.shippingDetails.address}
        </div>
      </div>

      {order.data.cart?.map(item => (
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

      <h5 className="order__total">
        Order Total:
        <small> ₹</small>
        <CurrFormat price={order.data.amount / 100} />
      </h5>

    </div>
  )
}

export default Order
