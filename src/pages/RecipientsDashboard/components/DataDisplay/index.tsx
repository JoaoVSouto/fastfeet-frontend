import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import api from '../../../../services/api';

import Table from '../../../../components/Table';
import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import { CardsContainer } from '../../../../components/Card';
import Highlight from '../../../../components/Highlight';
import Modal, {
  MODAL_FADE_TRANSITION_TIME_IN_MS,
  ModalDeletionContainer,
  AcceptButton,
  CancelButton,
} from '../../../../components/Modal';

import { Card } from './styles';

import { IRecipient } from '../..';

interface IProps {
  recipients: IRecipient[];
  recipientsSearch: string;
  removeRecipient(recipientId: number): void;
}

const DataDisplay: React.FC<IProps> = ({
  recipients,
  recipientsSearch,
  removeRecipient,
}) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [recipientToBeDeleted, setRecipientToBeDeleted] = useState<
    number | null
  >(null);

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

  function askForRecipientDeletion(recipientId: number): void {
    setRecipientToBeDeleted(recipientId);
    setIsDeletionModalOpen(true);
  }

  function resetDeletionModalState(): void {
    setIsDeletionModalOpen(false);

    setTimeout(() => {
      setRecipientToBeDeleted(null);
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  async function deleteRecipient(): Promise<void> {
    if (!recipientToBeDeleted) return;

    try {
      await api.delete(`recipients/${recipientToBeDeleted}`);

      removeRecipient(recipientToBeDeleted);

      toast.success('Destinatário excluído com sucesso!');
    } catch {
      toast.error('Ops... Algum erro aconteceu ao excluir destinatário.');
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
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>{`#${String(recipient.id).padStart(2, '0')}`}</td>
                <td>
                  <Highlight toHighlight={recipientsSearch}>
                    {recipient.name}
                  </Highlight>
                </td>
                <td>
                  {recipient.address_street}, {recipient.address_number}
                  {recipient.address_complement &&
                    `, ${recipient.address_complement}`}
                  , {recipient.city}/{recipient.uf}
                </td>
                <td>
                  <Actions>
                    <ActionsButtons
                      recipient={recipient}
                      askForCourierDeletion={askForRecipientDeletion}
                    />
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CardsContainer>
          {recipients.map(recipient => (
            <Card key={recipient.id}>
              <ActionsContainer>
                <Actions isMobile>
                  <ActionsButtons
                    recipient={recipient}
                    askForCourierDeletion={askForRecipientDeletion}
                  />
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>ID</strong>
                {`#${String(recipient.id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Nome</strong>
                <span>
                  <Highlight toHighlight={recipientsSearch}>
                    {recipient.name}
                  </Highlight>
                </span>
              </div>

              <div className="card-row address">
                <strong>Endereço</strong>
                {recipient.address_street}, {recipient.address_number}
                {recipient.address_complement &&
                  `, ${recipient.address_complement}`}
                , {recipient.city}/{recipient.uf}
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
            Tem certeza que deseja excluir o destinatário de ID{' '}
            <strong>{`#${String(recipientToBeDeleted).padStart(
              2,
              '0'
            )}`}</strong>
            ?
          </p>

          <div>
            <CancelButton onClick={resetDeletionModalState}>
              Cancelar
            </CancelButton>
            <AcceptButton onClick={deleteRecipient}>Excluir</AcceptButton>
          </div>
        </ModalDeletionContainer>
      </Modal>
    </>
  );
};

export default DataDisplay;
