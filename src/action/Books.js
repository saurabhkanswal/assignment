import {SET_BOOK_LIST} from './action.types';
import Axios from 'axios';

export const getBookList = () => async dispatch => {
  const url =
    'https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=20';
  try {
    const {data} = await Axios.get(url);
    dispatch({
      type: SET_BOOK_LIST,
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
  }
};
