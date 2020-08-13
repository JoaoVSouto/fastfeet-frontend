import { RehydrateAction } from 'redux-persist';
import { DefaultRootState } from 'react-redux';

declare module 'redux-persist' {
  export interface CustomRehydrateAction extends RehydrateAction {
    payload: DefaultRootState;
  }
}
