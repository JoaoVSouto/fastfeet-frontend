import React, { useState } from 'react';
import Select from 'react-select';
// import { useParams } from 'react-router-dom';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

import {
  Container,
  Row,
  Title,
  BackButton,
  SaveButton,
  Form,
  FormGroup,
  Fieldset,
  Label,
  Input,
} from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const PackagesEdit: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    typeof options[0] | null
  >(null);
  // const { id } = useParams();

  return (
    <Container>
      <Row>
        <Title>Edição de encomendas</Title>

        <div>
          <BackButton>
            <MdNavigateBefore />
            Voltar
          </BackButton>
          <SaveButton>
            <MdDone />
            Salvar
          </SaveButton>
        </div>
      </Row>

      <Form>
        <Fieldset>
          <FormGroup>
            <Label>Destinatário</Label>
            <Select
              value={selectedOption}
              placeholder="Ludwig van Beethoven"
              onChange={option =>
                setSelectedOption(option as typeof options[0])
              }
              options={options}
              classNamePrefix="ReactSelect"
            />
          </FormGroup>

          <FormGroup>
            <Label>Entregador</Label>
            <Select
              value={selectedOption}
              placeholder="John Doe"
              onChange={option =>
                setSelectedOption(option as typeof options[0])}
              options={options}
              classNamePrefix="ReactSelect"
            />
          </FormGroup>
        </Fieldset>

        <FormGroup>
          <Label htmlFor="product-name">Nome do produto</Label>
          <Input type="text" id="product-name" placeholder="Yamaha SX7" />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PackagesEdit;
