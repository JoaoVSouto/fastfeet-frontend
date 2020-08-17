import React, { forwardRef } from 'react';

import { Hamburguer as HamburguerButton, IHamburguerProps } from './styles';

type Props = IHamburguerProps & Omit<JSX.IntrinsicElements['button'], 'ref'>;

const Hamburguer = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <HamburguerButton ref={ref} {...props}>
    <span />
    <span />
    <span />
    <span />
  </HamburguerButton>
));

export default Hamburguer;
