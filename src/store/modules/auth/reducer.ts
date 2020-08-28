import produce from 'immer';
import { DefaultRootState } from 'react-redux';

import { IAction } from '../types';

const INITIAL_STATE: DefaultRootState['auth'] = {
  token: null,
  signed: false,
  loading: false,
  rememberMe: false,
  loggedOn: null,
};

export default function auth(
  state = INITIAL_STATE,
  action: IAction
): DefaultRootState['auth'] {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        break;

      case '@auth/SIGN_IN_SUCCESS':
        draft.token = action.payload?.token;
        draft.rememberMe = action.payload?.rememberMe;
        draft.signed = true;
        draft.loading = false;
        draft.loggedOn = new Date().toISOString();
        break;

      case '@auth/SIGN_FAILURE':
        draft.loading = false;
        break;

      case '@auth/SIGN_OUT':
        draft.token = null;
        draft.signed = false;
        break;

      default:
    }
  });
}
