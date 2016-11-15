import React from 'react';
import logo from './logo.svg';

function Header(props) {
  return (
    <div className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
  );
}

export default Header;
