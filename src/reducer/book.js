import {SET_BOOK_LIST} from '../action/action.types';

const initialState = {
  book: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_LIST:
      return {
        ...state,
        book: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
