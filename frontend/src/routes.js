import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import Logout from './components/Logout';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/new/:imc" component={New} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}
