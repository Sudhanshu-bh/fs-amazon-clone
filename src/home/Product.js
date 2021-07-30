import React from 'react';
import './Product.css';
import { useStateValue } from '../StateProvider';
import CurrFormat from '../CurrFormat';
import { ADD_TO_CART } from '../actionsList'

function Product({ product }) {

  console.log("product: ", product)
  const { id } = product
  const { title, mrp, sellprice, rating, imageUrl } = product.data
  // eslint-disable-next-line
  const [{ user, cart }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: ADD_TO_CART,
      item: {
        id: id,
        title: title,
        mrp: mrp,
        sellprice: sellprice,
        imageUrl: imageUrl,
        rating: rating
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <span className="product__mrp">
            ₹
            <strong>
              <CurrFormat price={mrp} />
            </strong>
          </span>
          <span className="product__sellprice">
            ₹
            <strong>
              <CurrFormat price={sellprice} />
            </strong>
          </span>
        </p>
        <div className="product__rating">
          {Array(parseInt(rating))
            .fill()
            .map((_, key) => (
              <p>⭐</p>
            ))}
        </div>
      </div >

      <img
        src={imageUrl}
        alt="Product"
      />

      <button onClick={addToCart} className="am-yellow-button">Add to Cart</button>
    </div >
  )
}

export default Product
