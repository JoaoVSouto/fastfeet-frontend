import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Container, Title, NotFound } from '../../components/DashboardRelated';
import DataDisplay from './components/DataDisplay';

export interface IProblem {
  id: number;
  package_id: number;
  description: string;
}

const ProblemsDashboard: React.FC = () => {
  const [problems, setProblems] = useState<IProblem[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get<IProblem[]>('problems');
      setProblems(data);
    })();
  }, []);

  return (
    <Container>
      <Title>Problemas na entrega</Title>

      {problems.length === 0 ? (
        <NotFound>
          Nenhum problema encontrado&nbsp;
          <span role="img" aria-label="expressão feliz">
            😊
          </span>
        </NotFound>
      ) : (
        <DataDisplay problems={problems} />
      )}
    </Container>
  );
};

export default ProblemsDashboard;
