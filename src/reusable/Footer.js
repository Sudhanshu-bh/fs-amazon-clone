import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import './Footer.css'

function Footer() {

  const [{ user }] = useStateValue()
  const [isVisible, setisVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setisVisible(true);
    } else {
      setisVisible(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="footer">
      {isVisible &&
        (<div className="footer__backToTop" onClick={scrollToTop}>
          <small>Back to top</small>
        </div>)
      }

      <div className="footer__part1">
        <div className="footer__column">
          <h6 className="footer__title">Get to Know Us</h6>
          <Link to="#">About Us</Link>
          <Link to="#">Careers</Link>
          <Link to="#">Press Releases</Link>
          <Link to="#">Amazon Cares</Link>
          <Link to="#">Gift a Smile</Link>
        </div>

        <div className="footer__column">
          <h6 className="footer__title">Connect with Us</h6>
          <a href="https://www.linkedin.com/in/sudhanshu-bh/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link to="#">Facebook</Link>
          <Link to="#">Instagram</Link>
        </div>

        <div className="footer__column">
          <h6 className="footer__title">Make Money with Us</h6>
          <Link to="#">Sell on Amazon</Link>
          <Link to="#">Sell under Amazon Accelerator</Link>
          <Link to="#">Amazon Global Selling</Link>
          <Link to="#">Become an Affiliate</Link>
          <Link to="#">Fulfilment by Amazon</Link>
          <Link to="#">Advertise Your Products</Link>
          <Link to="#">Amazon Pay on Merchants</Link>
        </div>

        <div className="footer__column">
          <h6 className="footer__title">Let Us Help You</h6>
          <Link to={user ? "/user" : "/login"} target="_blank">Your Account</Link>
          <Link to="#">Returns Centre</Link>
          <Link to="#">100% Purchase Protection</Link>
          <Link to="#">Amazon App Download</Link>
          <Link to="#">Help</Link>
        </div>
      </div>

      <div className="footer__part2">

        <div className="footer__row">
          <div className="footer__column">
            <div className="footer__title">AbeBooks</div>
            <div className="footer__desc">Books, art</div>
            <div className="footer__desc">& collectibles</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">Amazon Web Services</div>
            <div className="footer__desc">Scalable Cloud</div>
            <div className="footer__desc">Computing Services</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">Audible</div>
            <div className="footer__desc">Download</div>
            <div className="footer__desc">Audio Books</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">DPReview</div>
            <div className="footer__desc">Digital</div>
            <div className="footer__desc">Photography</div>
          </div>

          <div className="footer__column last">
            <div className="footer__title">IMDb</div>
            <div className="footer__desc">Movies, TV</div>
            <div className="footer__desc">& Celebrities</div>
          </div>
        </div>

        <div className="footer__row">
          <div className="footer__column">
            <div className="footer__title">Shopbop</div>
            <div className="footer__desc">Designer</div>
            <div className="footer__desc">Fashion Brands</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">Amazon Business</div>
            <div className="footer__desc">Everything For</div>
            <div className="footer__desc">Your Business</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">Prime Now</div>
            <div className="footer__desc">2-Hour Delivery</div>
            <div className="footer__desc">on Everyday Items</div>
          </div>

          <div className="footer__column">
            <div className="footer__title">Amazon Prime Music</div>
            <div className="footer__desc">70 million songs, ad-free</div>
            <div className="footer__desc">Over 9 million podcast episodes</div>
          </div>

          <div className="footer__column last">
          </div>
        </div>

        <div className="footer__rowLast">
          <Link to="#">Conditions of Use & Sale</Link>
          <Link to="#">Privacy Notice</Link>
          <Link to="#">&copy; 2021, Amazon Clone, by Sudhanshu Bhardwaj</Link>
					<div className='disclaimer'>This website is made for educational purposes only.</div>
        </div>

      </div>
    </footer >
  )
}

export default Footer
