import React from 'react';
import { connect } from 'react-redux';
import './App.css';


function mapStateToProps(state) {
  return { state };
}

const actionCreators = {
  add: () => ({ type: 'ADD' }),
  minus: () => ({ type: 'MINUS' }),
};

@connect(mapStateToProps, actionCreators)
class App {
  render() {
    const { props } = this;

    return (
      <div className="App">
        {props.state}
        <button onClick={props.add}>add</button>
        <button onClick={props.minus}>minus</button>
      </div>
    );
  }
}

export default App;
