import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signUp" component={SignUp} />
    </BrowserRouter>
  );
}

export default AuthRoutes;
