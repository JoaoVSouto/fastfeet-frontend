import {
  createStore,
  applyMiddleware,
  Reducer,
  Middleware,
  Store,
} from 'redux';

export default (reducer: Reducer, middlewares: Middleware[]): Store => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducer, enhancer);
};
