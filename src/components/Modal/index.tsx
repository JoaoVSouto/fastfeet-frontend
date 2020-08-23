import React, { memo, useState, useEffect } from 'react';
import ReactModal from 'react-modal';

interface IProps {
  open?: boolean;
}

type Props = React.PropsWithChildren<IProps>;

const Modal: React.FC<Props> = ({ children, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function toggleModal(): void {
    setIsOpen(!isOpen);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {children}
    </ReactModal>
  );
};

export default memo(Modal);
