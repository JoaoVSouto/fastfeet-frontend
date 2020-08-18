import { css } from 'styled-components';

interface Theme {
  backgroundColor: string;
  color: string;
}

const themes = [
  {
    backgroundColor: '#f4effc',
    color: '#a28fd0',
  },
  {
    backgroundColor: '#fcf4ee',
    color: '#cb946c',
  },
  {
    backgroundColor: '#ebfbfa',
    color: '#83cec9',
  },
  {
    backgroundColor: '#ffeef1',
    color: '#cc7584',
  },
  {
    backgroundColor: '#f4f9ef',
    color: '#a8d080',
  },
  {
    backgroundColor: '#fcfcef',
    color: '#cccc8b',
  },
];

function getRandomTheme(): Theme {
  const randomIndex = Math.floor(Math.random() * themes.length);

  const theme = themes[randomIndex];

  return theme;
}

export function randomTheme(): any {
  const theme = getRandomTheme();

  return css`
    color: ${theme.color};
    background-color: ${theme.backgroundColor};
  `;
}
