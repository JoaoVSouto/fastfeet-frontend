import React, { useMemo } from 'react';

import { getNameInitials } from '../../../../utils/getNameInitials';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import Table from '../../../../components/Table';
import {
  ImageContainer,
  ImagePlaceholder,
} from '../../../../components/Dashboard';
import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import Card, { CardsContainer } from '../../../../components/Card';
import Highlight from '../../../../components/Highlight';

import { ICourier } from '../..';

interface IProps {
  couriers: ICourier[];
  couriersSearch: string;
}

const DataDisplay: React.FC<IProps> = ({ couriers, couriersSearch }) => {
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
                    <ActionsButtons courier={courier} />
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
                  <ActionsButtons courier={courier} />
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
    </>
  );
};

export default DataDisplay;
