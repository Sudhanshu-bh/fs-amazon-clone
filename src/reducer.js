import * as actions from './actionsList'

export const initialState = {
  cart: [],
  user: null,
}

// Selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {

  switch (action.type) {
    case actions.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case actions.EMPTY_CART:
      return {
        ...state,
        cart: [],
      }

    case actions.REMOVE_FROM_CART:
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
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
