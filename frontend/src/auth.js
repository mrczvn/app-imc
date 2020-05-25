import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuth = () => {
  if (localStorage.getItem('token') !== null) {
    return true;
  }
  return false;
};

const privateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { message: 'Usuário não autorizado' }
              }}
            />
          )}
    />
  )
}

export default privateRoute;