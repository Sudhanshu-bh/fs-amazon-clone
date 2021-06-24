import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import { useStateValue } from '../StateProvider'
import Order from './Order'
import './Orders.css'

function Orders() {

  let i = 1;

  const [{ cart, user }, dispatch] = useStateValue()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        ))
    } else {
      setOrders([])
    }
  }, [user])

  return (
    <>
      <Header />

      <div className="orders lightgray-bg">

        <h1 className="orders__heading">Your Orders</h1>

        {orders?.map((order) => (
          <Order order={order} number={i++} />
        ))}

      </div>

      <Footer />
    </>
  )
}

export default Orders
