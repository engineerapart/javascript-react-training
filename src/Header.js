import React from 'react';
import { Link } from 'react-router';

import logo from './logo.svg';

const styles = {
  header: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white',
  }
};

function Header(props) {
  return (
    <div style={styles.header}>
      <img src={logo} className="app-logo" alt="logo" />
      <h2 style={{fontWeight: 'bold'}}>Welcome to React</h2>
      <Link to='posts' activeStyle={{color: 'red'}} activeClassName='whatever'>Go to Posts</Link>
    </div>
  );
}

export default Header;
