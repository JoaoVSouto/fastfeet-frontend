import React, { useState, useRef, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { Button, Dropdown } from './styles';

const Actions: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      if (
        !dropdownRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        <MdMoreHoriz />
      </Button>

      <Dropdown open={isOpen} ref={dropdownRef}>
        {children}
      </Dropdown>
    </>
  );
};

export default Actions;
