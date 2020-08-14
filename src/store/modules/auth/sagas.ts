import { takeLatest, all, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { CustomRehydrateAction } from 'redux-persist';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { IActionSignInRequest } from '../types';

import { signInSuccess, signFailure, signOut } from './actions';

export function setToken({ payload }: CustomRehydrateAction): void {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* treatRememberMe({
  payload,
}: CustomRehydrateAction): Generator {
  if (!payload) return;

  const { signed, rememberMe } = payload.auth;

  const rememberMeMarker = sessionStorage.getItem('fastfeet:rememberMeMarker');

  if (signed && !rememberMe && !rememberMeMarker) {
    yield put(signOut());
  }
}

// eslint-disable-next-line
export function* signIn({ payload }: IActionSignInRequest) {
  try {
    const { email, password, rememberMe } = payload;

    const response: AxiosResponse = yield call(api.post, '/sessions', {
      email,
      password,
    });

    sessionStorage.setItem('fastfeet:rememberMeMarker', 'set');

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, rememberMe));

    history.push('/packages');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('persist/REHYDRATE', treatRememberMe),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
