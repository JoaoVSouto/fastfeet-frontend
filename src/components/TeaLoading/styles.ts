import styled from 'styled-components';

export const Tea = styled.svg`
  /* All credits goes to: https://codepen.io/avstorm/pen/RwNzPNN */

  --secondary: ${({ theme }) => theme.primary};

  #teabag {
    transform-origin: top center;
    transform: rotate(3deg);
    animation: swing 2s infinite;
  }

  #steamL {
    stroke-dasharray: 13;
    stroke-dashoffset: 13;
    animation: steamLarge 2s infinite;
  }

  #steamR {
    stroke-dasharray: 9;
    stroke-dashoffset: 9;
    animation: steamSmall 2s infinite;
  }

  @keyframes swing {
    50% {
      transform: rotate(-3deg);
    }
  }

  @keyframes steamLarge {
    from {
      stroke-dashoffset: 13;
      opacity: 0.6;
    }

    to {
      stroke-dashoffset: 39;
      opacity: 0;
    }
  }

  @keyframes steamSmall {
    10% {
      stroke-dashoffset: 9;
      opacity: 0.6;
    }

    80% {
      stroke-dashoffset: 27;
      opacity: 0;
    }

    100% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
  }
`;
