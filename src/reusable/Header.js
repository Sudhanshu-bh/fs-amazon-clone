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

  const [toast, settoast] = useState({ text: "", type: "success" })

  const handleAuth = () => {
    if (user) {
      auth.signOut()
        .then(() => { settoast({ text: "Signed out successfully!", type: "success" }) })
        .catch(error => {
          settoast({ text: "Something went wrong. Please try again!", type: "danger" })
          console.log(error)
        })
    }
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

          <Link to={user ? "/user" : "/login"}>
            <div className="header__option">
              <span className="header__optionLineOne">Hello,
                {user ? " " + user.displayName : " Sign in"}</span>
              <span className="header__optionLineTwo">
                Account & Lists
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="/checkout" className="header__optionBasket header__option">
            <div className="header__optionBasketVisual">
              <ShoppingCartOutlinedIcon className="header__cartIcon" />
              <span className="header__optionLineTwo header__basketCount">{cart?.length}</span>
            </div>
            <span>&nbsp;Cart</span>
          </Link>

        </div>

      </div>

      <div className="header__nonSticky">
        <Link to=""><strong>☰ &nbsp;All</strong></Link>
        <Link to="">Mobiles</Link>
        <Link to="">Amazon Pay</Link>
        <Link to="">Home Improvement</Link>
        <Link to="">Kindle eBooks</Link>
        <Link to="">Computers</Link>
        <Link to="">Sports, Fitness & Outdoors</Link>
      </div>

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Header
