import 'react-redux';

declare module 'react-redux' {
  export interface DefaultRootState {
    auth: {
      token: string | null;
      signed: boolean;
      loading: boolean;
      rememberMe: boolean;
    };
  }
}
