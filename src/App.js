import React, { Component } from 'react';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app">
        <Header title={'Welcome to React'} />
        {children}
      </div>
    );
  }
}

export default App;
