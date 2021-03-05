import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import RoutesPrivate from './components/Routes/Private/Private';

import Home from './pages/Home';
import Login from './pages/Login';

export default function Routes() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route path="/login" exact component={Login} />
          <RoutesPrivate path="/" component={Home} />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}
