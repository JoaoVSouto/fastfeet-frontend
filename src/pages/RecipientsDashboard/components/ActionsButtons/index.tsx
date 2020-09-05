import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { IRecipient } from '../..';

interface IProps {
  recipient: IRecipient;
}

const ActionsButtons: React.FC<IProps> = ({ recipient }) => {
  return (
    <>
      <Link to={`recipients/edit/${recipient.id}`} className="edit">
        <MdEdit />
        Editar
      </Link>
      <button type="button" className="delete">
        <MdDeleteForever />
        Excluir
      </button>
    </>
  );
};

export default ActionsButtons;
