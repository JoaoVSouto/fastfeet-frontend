import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    tertiary: string;

    titleColor: string;
    textColor: string;
    textSecondaryColor: string;

    borderColor: string;
    iconColor: string;

    success: string;
    successLight: string;

    warning: string;
    warningLight: string;

    info: string;
    infoLight: string;

    danger: string;
    dangerLight: string;
  }
}
