import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import Toast from './Toast';

function Header() {
  const [{ cart, user }] = useStateValue()

  const [blurred, setblurred] = useState("")
  const [toast, settoast] = useState({ text: "", type: "success" })

  const signOut = () => {
    if (user) {
      auth.signOut()
        .then(() => { settoast({ text: "Signed out successfully!", type: "success" }) })
        .catch(error => {
          settoast({ text: "Something went wrong. Please try again!", type: "danger" })
          console.log(error)
        })
    }
  }

  const handleBlur = () => {
    blurred ? setblurred("") : setblurred("blurredAfter")
  }

  return (
    <>
      <div className="header">
        <Link to="/" className="header__logoContainer">
          <img
            className="header__logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon logo"
          />
        </Link>

        <div className="header__search">
          <input
            className="header__searchInput" type="text"
          />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">

          <div className="header__ddUser" onMouseOver={handleBlur} onMouseOut={handleBlur}>
            <Link
              className="header__option header__ddToggle"
              to={user ? "/user" : "/login"}>
              <span className="header__optionLineOne">Hello,
                {user ? " " + user.displayName.split(" ")[0] : " Sign in"}</span>
              <span className="header__optionLineTwo">
                Account & Lists
              </span>

              <div className="header__ddPinContainer">
                <div className="header__ddPin"></div>
              </div>
            </Link>

            {user ? (
              <div className="header__dd">
                <div className="header__ddMenu">

                  <div className="header__ddList left">
                    <h6>Your Lists</h6>
                    <Link className="header__ddItem first">{user?.displayName.split(" ")[0]}'s Wish List</Link>
                    <Link className="header__ddItem" to="#">Create a Wish List</Link>
                    <Link className="header__ddItem" to="#">Find a Wish List</Link>

                  </div>
                  <div className="header__ddList right">
                    <h6>Your Account</h6>
                    <Link className="header__ddItem" to="/user">Your Account</Link>
                    <Link className="header__ddItem" to="/user/orders">Your Orders</Link>
                    <Link className="header__ddItem" to="">Your Wish List</Link>
                    <Link className="header__ddItem" to="">Your Recommendations</Link>
                    <Link className="header__ddItem" to="/login"><div onClick={signOut}>Sign Out</div></Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="header__dd">
                <div className="header__ddMenu signIn">
                  <Link to="/login"><button className="header__ddItem signInButton am-orange-button">Sign in</button></Link>
                  <small>New customer?&nbsp;
                    <Link to="/signup">Start here.</Link>
                  </small>
                </div>
              </div>
            )
            }
          </div>


          <Link to="/user/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <Link to="/checkout" className="header__optionBasket header__option">
            <div className="header__optionBasketVisual">
              <ShoppingCartOutlinedIcon className="header__cartIcon" />
              <span className="header__optionLineTwo header__basketCount">
                {cart?.reduce((size, item) => item.quantity + size, 0)}
              </span>
            </div>
            <span>&nbsp;Cart</span>
          </Link>

        </div>

      </div>

      <div className={`header__nonSticky ${blurred}`}>
        <Link to="#"><strong>☰ &nbsp;All</strong></Link>
        <Link to="#">Mobiles</Link>
        <Link to="#">Amazon Pay</Link>
        <Link to="#">Home Improvement</Link>
        <Link to="#">Kindle eBooks</Link>
        <Link to="#">Computers</Link>
        <Link to="#">Sports, Fitness & Outdoors</Link>
      </div>

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Header
