import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from  './routes';
import './App.scss';
import './styles/common.scss';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
