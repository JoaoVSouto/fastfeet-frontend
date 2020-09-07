import React from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

import { IProblem } from '../..';
import { IPackageToBeCanceledInfo } from '../DataDisplay';

interface IProps {
  problem: IProblem;
  askForPackageCancelling(packageToBeCanceled: IPackageToBeCanceledInfo): void;
}

const ActionsButtons: React.FC<IProps> = ({
  problem,
  askForPackageCancelling,
}) => {
  return (
    <>
      <button type="button" className="view">
        <MdRemoveRedEye />
        Visualizar
      </button>
      <button
        type="button"
        className="delete"
        onClick={() =>
          askForPackageCancelling({
            problemId: problem.id,
            packageId: problem.package_id,
          })
        }
      >
        <MdDeleteForever />
        Cancelar encomenda
      </button>
    </>
  );
};

export default ActionsButtons;
