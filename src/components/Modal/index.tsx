import React, { memo, useState, useEffect, useCallback } from 'react';
import ReactModal from 'react-modal';

interface IProps {
  open?: boolean;
  onRequestClose?: () => void;
}

type Props = React.PropsWithChildren<IProps>;

const Modal: React.FC<Props> = ({ children, open = false, onRequestClose }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = useCallback(() => {
    if (onRequestClose) {
      onRequestClose();
    }

    setIsOpen(false);
  }, [onRequestClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {children}
    </ReactModal>
  );
};

export default memo(Modal);
