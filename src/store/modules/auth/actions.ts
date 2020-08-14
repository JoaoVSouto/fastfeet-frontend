import { IAction, IActionSignInRequest } from '../types';

export function signInRequest(
  email: string,
  password: string,
  rememberMe: boolean
): IActionSignInRequest {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
      rememberMe,
    },
  };
}

export function signInSuccess(token: string, rememberMe: boolean): IAction {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
      rememberMe,
    },
  };
}

export function signFailure(): IAction {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut(): IAction {
  return {
    type: '@auth/SIGN_OUT',
  };
}
