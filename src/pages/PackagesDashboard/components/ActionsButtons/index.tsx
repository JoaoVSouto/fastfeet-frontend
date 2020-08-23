import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

const ActionsButtons: React.FC = () => {
  return (
    <>
      <button type="button" className="view">
        <MdRemoveRedEye />
        Visualizar
      </button>
      <a href="#!" className="edit">
        <MdEdit />
        Editar
      </a>
      <button type="button" className="delete">
        <MdDeleteForever />
        Excluir
      </button>
    </>
  );
};

export default ActionsButtons;
