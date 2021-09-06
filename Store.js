import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './src/reducer';
import thunk from 'redux-thunk';
const middleware = [thunk];
import Reactotron from './ReactotronConfig';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), Reactotron.createEnhancer()),
);

export default store;
