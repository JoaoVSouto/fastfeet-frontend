import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { ICourier } from '../..';

interface IProps {
  courier: ICourier;
}

const ActionsButtons: React.FC<IProps> = ({ courier }) => {
  return (
    <>
      <Link to={`couriers/edit/${courier.id}`} className="edit">
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
