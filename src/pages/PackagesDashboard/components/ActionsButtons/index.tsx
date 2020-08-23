import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { IPackage } from '../..';

interface IProps {
  pkg: IPackage;
  viewPackageInfo: (packageId: number) => Promise<void>;
}

const ActionsButtons: React.FC<IProps> = ({ pkg, viewPackageInfo }) => {
  return (
    <>
      <button
        type="button"
        className="view"
        onClick={() => viewPackageInfo(pkg.id)}
      >
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
