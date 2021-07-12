import * as actions from './actionsList'
import { produce } from 'immer'

export const initialState = {
  cart: [],
  user: null,
}

// Selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {

  switch (action.type) {
    case actions.ADD_TO_CART:

      const index = state.cart.findIndex(item => item.id === action.item.id)

      if (index !== -1) {
        return produce(state, newState => {
          newState.cart[index].quantity++
        })
      } else {
        return produce(state, newState => {
          newState.cart.push({
            ...action.item,
            quantity: 1
          })
        })
      }

    case actions.INCREASE_QTY:
      return produce(state, newState => {
        // eslint-disable-next-line
        newState.cart.map(item => {
          if (item.id === action.id) {
            item.quantity++
          }
        })
      })

    case actions.DECREASE_QTY:
      return produce(state, newState => {
        // eslint-disable-next-line
        newState.cart.map(item => {
          if (item.id === action.id) {
            item.quantity--
          }
        })
      })

    case actions.EMPTY_CART:
      return {
        ...state,
        cart: [],
      }

    case actions.REMOVE_FROM_CART:
      const index2 = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];

      if (index2 >= 0) {
        newCart.splice(index2, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it is not present in the cart!`
        );
      }

      return {
        ...state,
        cart: newCart
      }

    case actions.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }

};

export default reducer;
