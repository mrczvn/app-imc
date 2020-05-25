import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Header from '../../components/Header';

export default function Dashboard({ history }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  function handleCalc(e) {
    e.preventDefault();
    const alturaMetros = altura / 100;
    const result = (peso / (alturaMetros * alturaMetros)).toFixed(2);
    history.push(`/new/${result}`);
  }
  return (
    <div className="col-md-6">
      <Header title="Calcular IMC"></Header>
      <hr className="my-3" />
      <Form>
        <FormGroup>
          <Label for="peso">Peso</Label>
          <Input
            type="text"
            id="peso"
            value={peso}
            placeholder="Informe seu peso"
            onChange={(e) => setPeso(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="altura">Altura</Label>
          <Input
            type="text"
            id="altura"
            value={altura}
            placeholder="Informe sua altura"
            onChange={(e) => setAltura(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" block type="submit" onClick={handleCalc}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}
