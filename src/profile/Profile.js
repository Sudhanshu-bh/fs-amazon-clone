import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import Header from '../reusable/Header'
import Footer from '../reusable/Footer'
import ProfileOption1 from './ProfileOption1'
import ProfileOption2 from './ProfileOption2'


function Profile() {
  return (
    <>
      <Header />

      <div className="profile">

        <h2 className="profile__header">Your Account</h2>

        <div className="profile__optionsContainer">
          <div className="profile__row">
            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
              title="Your Orders"
              desc="View your orders history"
              link="/orders"
            />

            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
              title="Login & Security"
              desc="Edit login, name, and mobile number"
              link="/user/security"
            />

            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png"
              title="Prime"
              desc="View benefits and payment settings"
            />
          </div>

          <div className="profile__row">
            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
              title="Your Addresses"
              desc="Edit addresses for orders and gifts"
            />

            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png"
              title="Payment options"
              desc="Edit or add payment methods"
            />

            <ProfileOption1
              image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png"
              title="Amazon Pay balance"
              desc="Add money to your balance"
            />
          </div>
        </div>

        <div>
          <div className="profile__row">
            <ProfileOption2 title="Digital content and devices">
              <Link to="">Apps and more</Link>
              <Link to="">Content and devices</Link>
            </ProfileOption2>

            <ProfileOption2 title="Email alerts, messages, and ads">
              <Link to="">Advertising preferences</Link>
              <Link to="">Communication preferences</Link>
              <Link to="">SMS alert preferences</Link>
              <Link to="">Message center</Link>
              <Link tp="">Alexa shopping notifications</Link>
              <Link to="">Deals Notifications</Link>
            </ProfileOption2>

            <ProfileOption2 title="More ways to pay">
              <Link to="">Default Purchase Settings</Link>
              <Link to="">Amazon Pay</Link>
              <Link to="">Bank accounts for refunds</Link>
              <Link to="">Coupons</Link>
            </ProfileOption2>
          </div>

          <div className="profile__row">
            <ProfileOption2 title="Ordering and shopping preferences">
              <Link to="">Leave packaging feedback</Link>
              <Link to="">Lists</Link>
              <Link to="">Photo ID proofs</Link>
              <Link to="">Profile</Link>
              <Link to="">Language settings</Link>
            </ProfileOption2>
          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Profile
