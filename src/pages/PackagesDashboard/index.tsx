import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { randomTheme } from '../../utils/getRandomTheme';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  ImagePlaceholder,
  Table,
  Status,
  Dropdown,
} from './styles';

const PackagesDashboard: React.FC = () => {
  return (
    <Container>
      <Title>Gerenciando encomendas</Title>

      <Controls>
        <SearchContainer>
          <MdSearch />
          <SearchInput type="text" placeholder="Buscar por encomendas" />
        </SearchContainer>
        <RegisterLink as={Link} to="/packages/register">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwig van Beethoven</td>
            <td>
              <span>
                <span className="img-container">
                  <img
                    src="https://api.adorable.io/avatars/face/eyes5/nose7/mouth7/6633cc"
                    alt="John Doe"
                  />
                </span>
                John Doe
              </span>
            </td>
            <td>Rio do Sul</td>
            <td>SC</td>
            <td>
              <Status status="delivered">Entregue</Status>
            </td>
            <td>
              <button type="button">
                <MdMoreHoriz />
              </button>

              <Dropdown>
                <button type="button" className="view">
                  <MdRemoveRedEye />
                  Visualizar
                </button>
                <a href="#!" className="edit">
                  <MdEdit />
                  Editar
                </a>
                <button type="button" className="delete">
                  <MdDeleteForever />
                  Excluir
                </button>
              </Dropdown>
            </td>
          </tr>

          <tr>
            <td>#02</td>
            <td>Wolfgang Amadeus</td>
            <td>
              <span>
                <span className="img-container">
                  <ImagePlaceholder colorTheme={randomTheme()}>
                    GA
                  </ImagePlaceholder>
                </span>
                Gaspar Antunes
              </span>
            </td>
            <td>Natal</td>
            <td>RN</td>
            <td>
              <Status status="pending">Pendente</Status>
            </td>
            <td>
              <button type="button">
                <MdMoreHoriz />
              </button>
            </td>
          </tr>

          <tr>
            <td>#03</td>
            <td>Johann Sebastian Bach</td>
            <td>
              <span>
                <span className="img-container">
                  <ImagePlaceholder colorTheme={randomTheme()}>
                    DJ
                  </ImagePlaceholder>
                </span>
                Dai Jiang
              </span>
            </td>
            <td>João Pessoa</td>
            <td>PB</td>
            <td>
              <Status status="withdrawal">Retirada</Status>
            </td>
            <td>
              <button type="button">
                <MdMoreHoriz />
              </button>
            </td>
          </tr>

          <tr>
            <td>#04</td>
            <td>Frédéric Chopin</td>
            <td>
              <span>
                <span className="img-container">
                  <ImagePlaceholder colorTheme={randomTheme()}>
                    TH
                  </ImagePlaceholder>
                </span>
                Tom Hanson
              </span>
            </td>
            <td>Recife</td>
            <td>PE</td>
            <td>
              <Status status="canceled">Cancelada</Status>
            </td>
            <td>
              <button type="button">
                <MdMoreHoriz />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PackagesDashboard;
