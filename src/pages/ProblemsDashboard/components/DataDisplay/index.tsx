import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import { format } from '../../../../utils/format';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import api from '../../../../services/api';

import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import Card, { CardsContainer } from '../../../../components/Card';
import Modal, {
  MODAL_FADE_TRANSITION_TIME_IN_MS,
  ModalLoading,
  ModalDeletionContainer,
  AcceptButton,
  CancelButton,
} from '../../../../components/Modal';

import { Table, ModalInfoContainer } from './styles';

import { IProblem } from '../..';

interface IProps {
  problems: IProblem[];
  removeProblems(packageId: number): void;
}

export interface IPackageToBeCanceledInfo {
  packageId: number;
  problemId: number;
}

const CHARACTER_AVERAGE_WIDTH = 7.5;

const DataDisplay: React.FC<IProps> = ({ problems, removeProblems }) => {
  const [problemTableDataWidth, setProblemTableDataWidth] = useState(80);
  const [isCancellingModalOpen, setIsCancellingModalOpen] = useState(false);
  const [
    packageToBeCanceled,
    setPackageToBeCanceled,
  ] = useState<IPackageToBeCanceledInfo | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [problemDescription, setProblemDescription] = useState('');

  const { width } = useWindowSize();

  const isDesktop = useMemo(() => {
    function isDesktopScreen(): boolean {
      return width >= 992;
    }

    if (isDesktopScreen()) {
      return true;
    }

    return false;
  }, [width]);

  function problemTableDataRef(
    tableDataNode: HTMLTableDataCellElement | null
  ): void {
    if (tableDataNode) {
      setProblemTableDataWidth(
        Math.floor(tableDataNode.offsetWidth / CHARACTER_AVERAGE_WIDTH)
      );
    }
  }

  function askForPackageCancelling(
    packageData: IPackageToBeCanceledInfo
  ): void {
    setPackageToBeCanceled(packageData);
    setIsCancellingModalOpen(true);
  }

  function resetCancellingModalState(): void {
    setIsCancellingModalOpen(false);

    setTimeout(() => {
      setPackageToBeCanceled(null);
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  async function cancelPackage(): Promise<void> {
    if (!packageToBeCanceled) return;

    const { packageId, problemId } = packageToBeCanceled;

    try {
      await api.delete(`problems/${problemId}/cancel-delivery`);

      removeProblems(packageId);

      toast.success('Encomenda cancelada com sucesso!');
    } catch {
      toast.error('Ops... Algum erro aconteceu ao cancelar encomenda.');
    } finally {
      resetCancellingModalState();
    }
  }

  function resetInfoModalState(): void {
    setIsInfoModalOpen(false);

    setTimeout(() => {
      setProblemDescription('');
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  async function loadProblemDescription(problemId: number): Promise<void> {
    setIsInfoModalOpen(true);

    try {
      const { data } = await api.get(`problems/${problemId}`);

      setProblemDescription(data.description);
    } catch {
      toast.error(
        'Ops... Algum erro aconteceu ao requisitar informações do problema.'
      );
      setIsInfoModalOpen(false);
    }
  }

  return (
    <>
      {isDesktop ? (
        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>{`#${String(problem.package_id).padStart(2, '0')}`}</td>
                <td ref={problemTableDataRef}>
                  {format.bigString(problem.description, problemTableDataWidth)}
                </td>
                <td>
                  <Actions dropdownWidth="20rem">
                    <ActionsButtons
                      problem={problem}
                      askForPackageCancelling={askForPackageCancelling}
                      loadProblemDescription={loadProblemDescription}
                    />
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CardsContainer>
          {problems.map(problem => (
            <Card key={problem.id}>
              <ActionsContainer>
                <Actions
                  dropdownWidth="20rem"
                  dropdownMobileLeft="-4.5rem"
                  isMobile
                >
                  <ActionsButtons
                    problem={problem}
                    askForPackageCancelling={askForPackageCancelling}
                    loadProblemDescription={loadProblemDescription}
                  />
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>Encomenda</strong>
                {`#${String(problem.package_id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Problema</strong>
                <span className="text-overflow-ellipsis">
                  {problem.description}
                </span>
              </div>
            </Card>
          ))}
        </CardsContainer>
      )}

      <Modal open={isInfoModalOpen} onRequestClose={resetInfoModalState}>
        {problemDescription ? (
          <ModalInfoContainer>
            <h4>Visualizar problema</h4>
            <p>{problemDescription}</p>
          </ModalInfoContainer>
        ) : (
          <ModalLoading />
        )}
      </Modal>

      <Modal
        open={isCancellingModalOpen}
        onRequestClose={resetCancellingModalState}
      >
        <ModalDeletionContainer>
          <p>
            Tem certeza que deseja cancelar a encomenda de ID{' '}
            <strong>{`#${String(packageToBeCanceled?.packageId).padStart(
              2,
              '0'
            )}`}</strong>
            ?
          </p>

          <div>
            <CancelButton onClick={resetCancellingModalState}>
              Cancelar
            </CancelButton>
            <AcceptButton onClick={cancelPackage}>Excluir</AcceptButton>
          </div>
        </ModalDeletionContainer>
      </Modal>
    </>
  );
};

export default DataDisplay;
