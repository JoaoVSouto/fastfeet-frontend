import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { IRecipient } from '../..';

interface IProps {
  recipient: IRecipient;
  askForCourierDeletion(recipientId: number): void;
}

const ActionsButtons: React.FC<IProps> = ({
  recipient,
  askForCourierDeletion,
}) => {
  return (
    <>
      <Link to={`recipients/edit/${recipient.id}`} className="edit">
        <MdEdit />
        Editar
      </Link>
      <button
        type="button"
        className="delete"
        onClick={() => askForCourierDeletion(recipient.id)}
      >
        <MdDeleteForever />
        Excluir
      </button>
    </>
  );
};

export default ActionsButtons;
