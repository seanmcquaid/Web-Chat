import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import friendsReducer from './friends/reducer';
import messagesReducer from './messages/reducer';
import userReducer from './user/reducer';

export const rootReducer = combineReducers({
  friends: friendsReducer,
  messages: messagesReducer,
  user: userReducer,
});

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
