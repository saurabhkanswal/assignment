import {
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART,
  RESET_CART,
} from '../action/action.types';

const initialState = {
  cart: [],
  bookIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_TO_CART:
      let index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          bookIds: [...state.bookIds, action.payload.id],
        };
      } else {
        return state;
      }

    case REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
        bookIds: [],
      };
    default:
      return state;
  }
};
