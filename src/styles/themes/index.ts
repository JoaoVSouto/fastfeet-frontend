import lightTheme from './light';

const breakpoints = {
  xsPhone: '320px',
  smPhone: '400px',
  phone: '576px',
  tablet: '876px',
  desktop: '992px',
  lgDesktop: '1200px',
};

export const light = {
  ...lightTheme,
  breakpoints,
};
