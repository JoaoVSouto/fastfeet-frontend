import { IAction, IActionSignInRequest } from '../types';

export function signInRequest(
  email: string,
  password: string
): IActionSignInRequest {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function signInSuccess(token: string): IAction {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
    },
  };
}

export function signFailure(): IAction {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
