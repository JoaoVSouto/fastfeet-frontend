import React, { useState, useRef, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { useIntersection } from '../../hooks/useIntersection';

import { Button, Dropdown } from './styles';

export { ActionsContainer } from './styles';

interface IProps {
  isMobile?: boolean;
  dropdownWidth?: string;
  dropdownMobileLeft?: string;
}

const Actions: React.FC<IProps> = ({
  children,
  isMobile,
  dropdownWidth,
  dropdownMobileLeft,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOutsidePage, setIsOutsidePage] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [intersection] = useIntersection(dropdownRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

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

  useEffect(() => {
    const handleWindowScroll = (): void => {
      setIsOutsidePage(false);
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    if (
      !isOutsidePage &&
      isOpen &&
      intersection &&
      intersection.intersectionRatio < 1
    ) {
      setIsOutsidePage(true);
    }
  }, [intersection, isOutsidePage, isOpen]);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        <MdMoreHoriz />
      </Button>

      <Dropdown
        open={isOpen}
        ref={dropdownRef}
        intersected={isOutsidePage}
        isMobile={isMobile}
        width={dropdownWidth}
        mobileLeft={dropdownMobileLeft}
      >
        {children}
      </Dropdown>
    </>
  );
};

export default Actions;
