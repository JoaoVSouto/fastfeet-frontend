import React, { memo, useState, useEffect, useCallback } from 'react';
import ReactModal from 'react-modal';

export { ModalDeletionContainer, AcceptButton, CancelButton } from './styles';

interface IProps {
  open?: boolean;
  onRequestClose?: () => void;
}

type Props = React.PropsWithChildren<IProps>;

export const MODAL_FADE_TRANSITION_TIME_IN_MS = 300;

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
      closeTimeoutMS={MODAL_FADE_TRANSITION_TIME_IN_MS}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {children}
    </ReactModal>
  );
};

export default memo(Modal);
