import { takeLatest, all, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { IActionSignInRequest } from '../types';

import { signInSuccess, signFailure } from './actions';

// eslint-disable-next-line
export function* signIn({ payload }: IActionSignInRequest) {
  try {
    const { email, password } = payload;

    const response: AxiosResponse = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));

    history.push('/packages');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
