import React from 'react';
import { Link } from 'react-router';

import logo from './logo.svg';

function Header(props) {
  return (
    <div className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h2 style={{fontWeight: 'bold'}}>Welcome to React</h2>
      <Link to='posts' activeStyle={{color: 'red'}}>Go to Posts</Link>
    </div>
  );
}

export default Header;
