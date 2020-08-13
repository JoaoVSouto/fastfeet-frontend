import produce from 'immer';

import { IAction } from '../types';

interface IInitialState {
  token: string | null;
  signed: boolean;
  loading: boolean;
}

const INITIAL_STATE: IInitialState = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: IAction
): IInitialState {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        break;

      case '@auth/SIGN_IN_SUCCESS':
        draft.token = action.payload?.token;
        draft.signed = true;
        draft.loading = false;
        break;

      case '@auth/SIGN_FAILURE':
        draft.loading = false;
        break;

      default:
    }
  });
}
