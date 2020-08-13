import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';

export default (reducer: Reducer): Reducer => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth'],
    },
    reducer
  );

  return persistedReducer;
};
