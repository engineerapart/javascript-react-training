import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

import postsReducer from './reducers';

const reducers = combineReducers({
  routing: routerReducer,
  subredditPosts: postsReducer,
});
const initialState = {};

const middleware = [
  routerMiddleware(browserHistory),
];

// Create the Store
const Store = createStore(reducers, initialState,
                          applyMiddleware(...middleware));

Store.subscribe(() => {
  console.log('Store changed: ', Store.getState());
});

export default Store;