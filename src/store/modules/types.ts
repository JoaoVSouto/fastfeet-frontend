export interface IAction {
  type: string;
  payload?: {
    [key: string]: any;
  };
}

export interface IActionSignInRequest extends IAction {
  payload: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
}
