import React from 'react';

export default function Logout({ history }) {
  function componentWillMount() {
    localStorage.removeItem('token');
    return history.push('/');
  }
  return <>{componentWillMount()}</>;
}
