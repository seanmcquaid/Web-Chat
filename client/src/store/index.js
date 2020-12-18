import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import friendsReducer from './friends/reducer';
import userReducer from './user/reducer';
import errorReducer from './error/reducer';
import loadingReducer from './loading/reducer';

export const rootReducer = combineReducers({
  friends: friendsReducer,
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
