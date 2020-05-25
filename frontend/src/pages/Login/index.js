import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header/index';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function signIn(e) {
    e.preventDefault();
    const data = { email, password };
    console.log(data);
    try {
      const response = await api(data);
      if (response) {
        const { token } = response.data;
        console.log(token);
        localStorage.setItem('token', token);
        history.push('/dashboard');
      }
    } catch (e) {
      setMessage('Login inválido...');
    }
  }

  return (
    <div className="col-md-6">
      <Header title="SignIn" />
      <hr className="my-3" />
      {message !== '' ? (
        <Alert color="danger" className="text-center">
          {message}
        </Alert>
      ) : (
        ''
      )}
      <Form onSubmit={signIn}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            id="email"
            value={email}
            placeholder="Informe o seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Informe a senha"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </FormGroup>
        <Button color="primary" block type="submit">
          Entrar
        </Button>
      </Form>
    </div>
  );
}
