import React from 'react';
import Header from '../../components/Header';
import { Card, Button, CardTitle, CardText, Nav, Navbar } from 'reactstrap';

export default function New({ match, history }) {
  const { imc } = match.params;

  function handleResult() {
    if (imc < 18.5) {
      return 'Magreza';
    } else if (imc >= 18.5 && imc <= 29.99) {
      return 'Peso normal';
    } else if (imc >= 30 && imc <= 34.5) {
      return 'Obesidade grau I';
    } else {
      return 'Obesidade grau II';
    }
  }

  return (
    <>
      <div className="col-md-6">
        <Navbar color="light">
          <Nav className="rightNav ml-auto" navbar>
            <div className="text-right">
              <Button
                color="secondary"
                onClick={(e) => history.push('/logout')}
              >
                LogOut
              </Button>
            </div>
          </Nav>
        </Navbar>
        <br />
        <Header title="Resultado IMC" />
        <hr className="my-3" />
        <Card body outline color="warning">
          <CardTitle className="text-center">{handleResult()}</CardTitle>
          <CardText></CardText>
          <Button
            color="secondary"
            block
            onClick={(e) => history.push('/dashboard')}
          >
            Calcular Novamente
          </Button>
        </Card>
      </div>
    </>
  );
}
