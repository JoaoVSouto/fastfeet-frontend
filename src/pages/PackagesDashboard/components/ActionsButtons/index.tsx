import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { IPackage } from '../..';

interface IProps {
  pkg: IPackage;
  viewPackageInfo: (packageId: number) => Promise<void>;
  askForPackageDeletion: (packageId: number) => void;
}

const ActionsButtons: React.FC<IProps> = ({
  pkg,
  viewPackageInfo,
  askForPackageDeletion,
}) => {
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
      <button
        type="button"
        className="delete"
        onClick={() => askForPackageDeletion(pkg.id)}
      >
        <MdDeleteForever />
        Excluir
      </button>
    </>
  );
};

export default ActionsButtons;
