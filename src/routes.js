import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import CompleteProfile from './pages/CompleteProfile';
import NotFound from './pages/404';


function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/complete-profile" component={CompleteProfile} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
