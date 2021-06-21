import React from 'react'
import './Home.css'
import Product from './Product'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'

function Home() {
  return (
    <>
      <Header />

      <div className="home lightgray-bg">
        <div className="home__container">
          <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
          />

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
            // image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300*400_retinamobilex2$"
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

      <Footer />
    </>
  )
}

export default Home
