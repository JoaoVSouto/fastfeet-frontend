import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { Button, Dropdown } from './styles';

const Actions: React.FC = ({ children }) => {
  return (
    <>
      <Button type="button">
        <MdMoreHoriz />
      </Button>

      <Dropdown>{children}</Dropdown>
    </>
  );
};

export default Actions;
