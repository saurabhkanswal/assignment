import {combineReducers} from 'redux';
import auth from './auth';
import book from './book';
import cart from './cart';

export default combineReducers({
  auth,
  book,
  cart,
});
