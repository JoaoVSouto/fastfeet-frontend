import React, { useMemo } from 'react';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import Table from '../../../../components/Table';
import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import { CardsContainer } from '../../../../components/Card';

import { Card } from './styles';

import { IRecipient } from '../..';

interface IProps {
  recipients: IRecipient[];
}

const DataDisplay: React.FC<IProps> = ({ recipients }) => {
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
                <td>{recipient.name}</td>
                <td>
                  {recipient.address_street}, {recipient.address_number}
                  {recipient.address_complement &&
                    `, ${recipient.address_complement}`}
                  , {recipient.city}/{recipient.uf}
                </td>
                <td>
                  <Actions>
                    <ActionsButtons recipient={recipient} />
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
                  <ActionsButtons recipient={recipient} />
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>ID</strong>
                {`#${String(recipient.id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Nome</strong>
                <span>{recipient.name}</span>
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
    </>
  );
};

export default DataDisplay;
