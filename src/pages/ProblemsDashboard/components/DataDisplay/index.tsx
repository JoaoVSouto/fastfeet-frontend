import React, { useState, useMemo } from 'react';

import { format } from '../../../../utils/format';

import { useWindowSize } from '../../../../hooks/useWindowSize';

import Actions, { ActionsContainer } from '../../../../components/Actions';
import ActionsButtons from '../ActionsButtons';
import Card, { CardsContainer } from '../../../../components/Card';

import { Table } from './styles';

import { IProblem } from '../..';

interface IProps {
  problems: IProblem[];
}

const CHARACTER_AVERAGE_WIDTH = 7.5;

const DataDisplay: React.FC<IProps> = ({ problems }) => {
  const [problemTableDataWidth, setProblemTableDataWidth] = useState(80);

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
                    <ActionsButtons />
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
                  <ActionsButtons />
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
    </>
  );
};

export default DataDisplay;
