import React, { useState, useEffect } from 'react'
import './Footer.css'

function Footer() {

  const [isVisible, setisVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
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
      <div className="footer__main">
        <strong>Full Stack Amazon Clone</strong>
        <small> made by </small>
        <strong>Sudhanshu Bhardwaj</strong>
      </div>
    </footer>
  )
}

export default Footer
