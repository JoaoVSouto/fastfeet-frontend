import React from 'react';

import { lower } from '../../utils/lower';

interface IProps {
  toHighlight: string;
  children: string;
}

const Highlight: React.FC<IProps> = ({ children, toHighlight }) => {
  const regex = new RegExp(`(${toHighlight})`, 'i');

  return (
    <>
      {children.split(regex).map((chunk, index) => {
        if (lower(chunk) === lower(toHighlight)) {
          // eslint-disable-next-line react/no-array-index-key
          return <mark key={index}>{chunk}</mark>;
        }

        return chunk;
      })}
    </>
  );
};

export default Highlight;
