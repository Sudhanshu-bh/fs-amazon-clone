import React from 'react';
import './Product.css';
import { useStateValue } from '../StateProvider';
import CurrFormat from '../CurrFormat';

function Product({ id, title, image, price, rating }) {

  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>
            <CurrFormat price={price} />
          </strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, key) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img
        src={image}
        alt="Product"
      />

      <button onClick={addToCart} className="am-yellow-button">Add to Cart</button>
    </div>
  )
}

export default Product
