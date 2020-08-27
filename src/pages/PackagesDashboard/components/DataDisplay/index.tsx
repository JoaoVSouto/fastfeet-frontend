import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { getNameInitials } from '../../../../utils/getNameInitials';
import { format } from '../../../../utils/format';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import api from '../../../../services/api';

import Actions, { ActionsContainer } from '../../../../components/Actions';
import Table from '../../../../components/Table';
import Card, { CardsContainer } from '../../../../components/Card';
import Highlight from '../../../../components/Highlight';
import Modal, {
  MODAL_FADE_TRANSITION_TIME_IN_MS,
  ModalDeletionContainer,
  AcceptButton,
  CancelButton,
} from '../../../../components/Modal';
import TeaLoading from '../../../../components/TeaLoading';
import {
  ImageContainer,
  ImagePlaceholder,
} from '../../../../components/DashboardRelated';
import ActionsButtons from '../ActionsButtons';

import { IPackage } from '../..';

import { Status, InfoBox, ModalLoadingContainer, NotFound } from './styles';

interface IPackageInfo {
  canceled_at?: string;
  start_date?: string;
  end_date?: string;
  recipient: {
    name: string;
    address_street: string;
    address_number: number;
    address_complement?: string;
    address_cep: string;
    uf: string;
    city: string;
  };
  signature?: {
    url: string;
  };
}

interface IProps {
  packages: IPackage[];
  packagesSearch: string;
  removePackage: (packageId: number) => void;
}

const DataDisplay: React.FC<IProps> = ({
  packages,
  packagesSearch,
  removePackage,
}) => {
  const [isPackageInfoModalOpen, setIsPackageInfoModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [packageInfo, setPackageInfo] = useState<IPackageInfo | null>(null);
  const [packageToBeDeleted, setPackageToBeDeleted] = useState<number | null>(
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

  async function viewPackageInfo(packageId: number): Promise<void> {
    setIsPackageInfoModalOpen(true);

    try {
      const { data } = await api.get<IPackageInfo>(`packages/${packageId}`);

      const packageInfoTreated = {
        ...data,
        canceled_at: data.canceled_at
          ? format.date(data.canceled_at)
          : undefined,
        start_date: data.start_date ? format.date(data.start_date) : undefined,
        end_date: data.end_date ? format.date(data.end_date) : undefined,
        recipient: {
          ...data.recipient,
          address_cep: format.cep(data.recipient.address_cep),
        },
      };

      setPackageInfo(packageInfoTreated);
    } catch {
      toast.error(
        'Ops... Algum erro aconteceu ao requisitar informações da encomenda.'
      );
      setIsPackageInfoModalOpen(false);
    }
  }

  function askForPackageDeletion(packageId: number): void {
    setPackageToBeDeleted(packageId);
    setIsDeletionModalOpen(true);
  }

  function resetPackageInfoModalState(): void {
    setIsPackageInfoModalOpen(false);

    setTimeout(() => {
      setPackageInfo(null);
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  function resetDeletionModalState(): void {
    setIsDeletionModalOpen(false);

    setTimeout(() => {
      setPackageToBeDeleted(null);
    }, MODAL_FADE_TRANSITION_TIME_IN_MS);
  }

  async function deletePackage(): Promise<void> {
    if (!packageToBeDeleted) return;

    try {
      await api.delete(`packages/${packageToBeDeleted}`);

      removePackage(packageToBeDeleted);

      toast.success('Encomenda excluída com sucesso!');
    } catch {
      toast.error('Ops... Algum erro aconteceu ao deletar a encomenda.');
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
              <th>Destinatário</th>
              <th>Produto</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td>{`#${String(pkg.id).padStart(2, '0')}`}</td>
                <td>{pkg.recipient.name}</td>
                <td>
                  <Highlight toHighlight={packagesSearch}>
                    {pkg.product}
                  </Highlight>
                </td>
                <td>
                  <span>
                    {pkg.courier ? (
                      <>
                        <ImageContainer>
                          {pkg.courier.avatar ? (
                            <img
                              src={pkg.courier.avatar.url}
                              alt={pkg.courier.name}
                            />
                          ) : (
                            <ImagePlaceholder colorTheme={pkg.colorTheme}>
                              {getNameInitials(pkg.courier.name)}
                            </ImagePlaceholder>
                          )}
                        </ImageContainer>
                        {pkg.courier.name}
                      </>
                    ) : (
                      <NotFound>Não possui</NotFound>
                    )}
                  </span>
                </td>
                <td>{pkg.recipient.city}</td>
                <td>{pkg.recipient.uf}</td>
                <td>
                  <Status status={pkg.status}>{pkg.status}</Status>
                </td>
                <td>
                  <Actions>
                    <ActionsButtons
                      pkg={pkg}
                      viewPackageInfo={viewPackageInfo}
                      askForPackageDeletion={askForPackageDeletion}
                    />
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CardsContainer>
          {packages.map(pkg => (
            <Card key={pkg.id}>
              <ActionsContainer>
                <Actions isMobile>
                  <ActionsButtons
                    pkg={pkg}
                    viewPackageInfo={viewPackageInfo}
                    askForPackageDeletion={askForPackageDeletion}
                  />
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>ID</strong>
                {`#${String(pkg.id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Destinatário</strong>
                {pkg.recipient.name}
              </div>

              <div className="card-row">
                <strong>Produto</strong>
                <span>
                  <Highlight toHighlight={packagesSearch}>
                    {pkg.product}
                  </Highlight>
                </span>
              </div>

              <div className="card-row">
                <strong>Entregador</strong>
                {pkg.courier ? (
                  <>
                    <ImageContainer>
                      {pkg.courier.avatar ? (
                        <img
                          src={pkg.courier.avatar.url}
                          alt={pkg.courier.name}
                        />
                      ) : (
                        <ImagePlaceholder colorTheme={pkg.colorTheme}>
                          {getNameInitials(pkg.courier.name)}
                        </ImagePlaceholder>
                      )}
                    </ImageContainer>
                    {pkg.courier.name}
                  </>
                ) : (
                  <NotFound>Não possui</NotFound>
                )}
              </div>

              <div className="card-row">
                <strong>Cidade</strong>
                {pkg.recipient.city}
              </div>

              <div className="card-row">
                <strong>Estado</strong>
                {pkg.recipient.uf}
              </div>

              <div className="card-row">
                <strong>Status</strong>
                <Status status={pkg.status}>{pkg.status}</Status>
              </div>
            </Card>
          ))}
        </CardsContainer>
      )}

      <Modal
        open={isPackageInfoModalOpen}
        onRequestClose={resetPackageInfoModalState}
      >
        {packageInfo ? (
          <>
            <InfoBox>
              <h5>Informações da encomenda</h5>
              <p>
                {packageInfo.recipient.address_street},{' '}
                {packageInfo.recipient.address_number}
                {packageInfo.recipient.address_complement &&
                  `, ${packageInfo.recipient.address_complement}`}
              </p>
              <p>
                {packageInfo.recipient.city} - {packageInfo.recipient.uf}
              </p>
              <p>{packageInfo.recipient.address_cep}</p>
            </InfoBox>
            <InfoBox>
              <h5>Datas</h5>
              {packageInfo.canceled_at ? (
                <p>
                  <strong>Cancelamento:</strong> 25/01/2020
                </p>
              ) : (
                <>
                  <p>
                    <strong>Retirada:</strong>{' '}
                    {packageInfo.start_date ? (
                      packageInfo.start_date
                    ) : (
                      <span className="pending">Pendente</span>
                    )}
                  </p>
                  <p>
                    <strong>Entrega:</strong>{' '}
                    {packageInfo.end_date ? (
                      packageInfo.end_date
                    ) : (
                      <span className="pending">Pendente</span>
                    )}
                  </p>
                </>
              )}
            </InfoBox>
            {packageInfo.signature && (
              <InfoBox>
                <h5>Assinatura do destinatário</h5>
                <img
                  src={packageInfo.signature.url}
                  alt={`Assinatura do destinatário ${packageInfo.recipient.name}`}
                />
              </InfoBox>
            )}
          </>
        ) : (
          <ModalLoadingContainer>
            <TeaLoading />
            <strong>Carregando...</strong>
          </ModalLoadingContainer>
        )}
      </Modal>

      <Modal
        open={isDeletionModalOpen}
        onRequestClose={resetDeletionModalState}
      >
        <ModalDeletionContainer>
          <p>
            Tem certeza que deseja excluir a encomenda de ID{' '}
            <strong>{`#${String(packageToBeDeleted).padStart(2, '0')}`}</strong>
            ?
          </p>

          <div>
            <CancelButton onClick={resetDeletionModalState}>
              Cancelar
            </CancelButton>
            <AcceptButton onClick={deletePackage}>Excluir</AcceptButton>
          </div>
        </ModalDeletionContainer>
      </Modal>
    </>
  );
};

export default DataDisplay;
