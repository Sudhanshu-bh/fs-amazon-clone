import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import LoginReq from '../LoginReq'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import { useStateValue } from '../StateProvider'
import Order from './Order'
import './Orders.css'

function Orders() {

  let i = 1;

  // eslint-disable-next-line
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

        <LoginReq show={!user}>
          You are not currently logged in.
          <p>Please <Link to="/login">login</Link> to view your orders.</p>
        </LoginReq>

        {orders?.map((order) => (
          <Order order={order} number={i++} />
        ))}

      </div>

      <Footer />
    </>
  )
}

export default Orders
