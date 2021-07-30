import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Home.css'
import Product from './Product'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import Toast from '../reusable/Toast'
import { db } from '../firebase'

function Home() {

  const location = useLocation()
  const [toast, settoast] = useState({})
  const [products, setproducts] = useState([])

  useEffect(() => {
    if (location.state?.toast.type === "success") {
      settoast({ text: "Login successsful!", type: "success" })

      window.history.replaceState({}, document.title)
    }

    db
      .collection('products')
      .orderBy('addedOn', 'desc')
      .onSnapshot(snapshot => (
        setproducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  }, [location])

  return (
    <>
      <Header />

      <div className="home lightgray-bg">
        <div className="home__container">

          <div id="carouselExampleControls" className="carousel slide home__carousel" data-bs-interval="2800" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/Jun21/D23947948_IN_CEPC_Clearance_store_May21_rush_3000x12000.5x._CB665291878_.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Gateway/Zeitgeist/Test/IQOO__ad_test_1500-x-600_updated._CB665297553_.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/unrec1499/Under1499_Gw_1500x600._CB661592357_.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="home__productsContainer">
            {products?.map((product) => (
              <Product product={product} />
            ))}
          </div>

        </div>
      </div>

      <Footer />

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Home
