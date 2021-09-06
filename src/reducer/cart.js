import {ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART} from '../action/action.types';

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_TO_CART:
      let index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      } else {
        return state;
      }

    case REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};
