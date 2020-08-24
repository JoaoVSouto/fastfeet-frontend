import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to={`packages/edit/${pkg.id}`} className="edit">
        <MdEdit />
        Editar
      </Link>
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
