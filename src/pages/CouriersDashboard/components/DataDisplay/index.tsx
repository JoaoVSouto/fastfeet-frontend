import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { getNameInitials } from '../../../../utils/getNameInitials';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import api from '../../../../services/api';

import Table from '../../../../components/Table';
import {
  ImageContainer,
  ImagePlaceholder,
} from '../../../../components/Dashboard';
import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import Card, { CardsContainer } from '../../../../components/Card';
import Highlight from '../../../../components/Highlight';
import Modal, {
  MODAL_FADE_TRANSITION_TIME_IN_MS,
  ModalDeletionContainer,
  AcceptButton,
  CancelButton,
} from '../../../../components/Modal';

import { ICourier } from '../..';

interface IProps {
  couriers: ICourier[];
  couriersSearch: string;
  removeCourier(courierId: number): void;
}

const DataDisplay: React.FC<IProps> = ({
  couriers,
  couriersSearch,
  removeCourier,
}) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [courierToBeDeleted, setCourierToBeDeleted] = useState<number | null>(
    null
  );

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

  function askForCourierDeletion(courierId: number): void {
    setCourierToBeDeleted(courierId);
    setIsDeletionModalOpen(true);
  }

  function resetDeletionModalState(): void {
    setIsDeletionModalOpen(false);

    setTimeout(() => {
      setCourierToBeDeleted(null);
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  async function deleteCourier(): Promise<void> {
    if (!courierToBeDeleted) return;

    try {
      await api.delete(`couriers/${courierToBeDeleted}`);

      removeCourier(courierToBeDeleted);

      toast.success('Entregador excluído com sucesso!');
    } catch {
      toast.error('Ops... Algum erro aconteceu ao excluir entregador.');
    } finally {
      resetDeletionModalState();
    }
  }

  return (
    <>
      {isDesktop ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {couriers.map(courier => (
              <tr key={courier.id}>
                <td>{`#${String(courier.id).padStart(2, '0')}`}</td>
                <td>
                  <span>
                    <ImageContainer>
                      {courier.avatar ? (
                        <img src={courier.avatar.url} alt={courier.name} />
                      ) : (
                        <ImagePlaceholder colorTheme={courier.colorTheme}>
                          {getNameInitials(courier.name)}
                        </ImagePlaceholder>
                      )}
                    </ImageContainer>
                  </span>
                </td>
                <td>
                  <Highlight toHighlight={couriersSearch}>
                    {courier.name}
                  </Highlight>
                </td>
                <td>{courier.email}</td>
                <td>
                  <Actions>
                    <ActionsButtons
                      courier={courier}
                      askForCourierDeletion={askForCourierDeletion}
                    />
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CardsContainer>
          {couriers.map(courier => (
            <Card key={courier.id}>
              <ActionsContainer>
                <Actions isMobile>
                  <ActionsButtons
                    courier={courier}
                    askForCourierDeletion={askForCourierDeletion}
                  />
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>ID</strong>
                {`#${String(courier.id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Foto</strong>
                <ImageContainer>
                  {courier.avatar ? (
                    <img src={courier.avatar.url} alt={courier.name} />
                  ) : (
                    <ImagePlaceholder colorTheme={courier.colorTheme}>
                      {getNameInitials(courier.name)}
                    </ImagePlaceholder>
                  )}
                </ImageContainer>
              </div>

              <div className="card-row">
                <strong>Nome</strong>
                <span>
                  <Highlight toHighlight={couriersSearch}>
                    {courier.name}
                  </Highlight>
                </span>
              </div>

              <div className="card-row">
                <strong>Email</strong>
                <span className="email">{courier.email}</span>
              </div>
            </Card>
          ))}
        </CardsContainer>
      )}

      <Modal
        open={isDeletionModalOpen}
        onRequestClose={resetDeletionModalState}
      >
        <ModalDeletionContainer>
          <p>
            Tem certeza que deseja excluir o entregador de ID{' '}
            <strong>{`#${String(courierToBeDeleted).padStart(2, '0')}`}</strong>
            ?
          </p>

          <div>
            <CancelButton onClick={resetDeletionModalState}>
              Cancelar
            </CancelButton>
            <AcceptButton onClick={deleteCourier}>Excluir</AcceptButton>
          </div>
        </ModalDeletionContainer>
      </Modal>
    </>
  );
};

export default DataDisplay;
