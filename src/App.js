import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import CompleteProfile from './pages/CompleteProfile';
import './App.scss';
import './styles/common.scss';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/complete-profile" component={CompleteProfile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
