import React from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

const ActionsButtons: React.FC = () => {
  return (
    <>
      <button type="button" className="view">
        <MdRemoveRedEye />
        Visualizar
      </button>
      <button type="button" className="delete">
        <MdDeleteForever />
        Cancelar encomenda
      </button>
    </>
  );
};

export default ActionsButtons;
