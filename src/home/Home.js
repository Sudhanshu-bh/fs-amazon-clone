import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Home.css'
import Product from './Product'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import Toast from '../reusable/Toast'

function Home() {

  const location = useLocation()
  const [toast, settoast] = useState({})

  useEffect(() => {
    if (location.state?.toast.type === "success") {
      settoast({ text: "Login successsful!", type: "success" })

      window.history.replaceState({}, document.title)
    }
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
            <div className="home__row">
              <Product
                id="51432687"
                title="Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!"
                price={302}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/51u8ZRDCVoL._SX330_BO1,204,203,200_.jpg"
              />
              <Product
                id="32759658"
                title="Logitech G203 Prodigy RGB Wired Gaming Mouse – Black"
                price={940}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/71BmDZ6u22L._AC_SL1500_.jpg"
              />
            </div>

            <div className="home__row">
              <Product
                id="62415253"
                title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                price={2999}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/61EXU8BuGZL._SL1100_.jpg"
              />
              <Product
                id="85565412"
                title="Spalding Zi/O Indoor-Outdoor Basketball"
                price={731}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/91sjL7skP2S._AC_SL1500_.jpg"
              />
              <Product
                id="73266428"
                title="Apple iPad Pro (10.5-inch, Wi-Fi + Cellular, 64GB) - Gold"
                price={71900}
                rating={5}
                image="https://images-na.ssl-images-amazon.com/images/I/71Q7eTSOyRL._AC_SL1500_.jpg"
              />
            </div>

            <div className="home__row">
              <Product
                id="47521952"
                title='Acer EI491CR Pbmiiipx 49" Curved DFHD (3840 x 1080) VA Monitor with AMD Radeon FreeSync2 Technology ,144Hz, VESA Certified DisplayHDR400, DCI-P3,Black'
                price={123799}
                rating={5}
                image="https://images-na.ssl-images-amazon.com/images/I/71IuwPZBKnL._AC_SL1500_.jpg"
              />
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Home
