import React from 'react';
import { IndexLink, Link } from 'react-router';

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
  const { title } = props;

  return (
    <div style={styles.header}>
      <img src={logo} className="app-logo" alt="logo" />
      <h2 style={{fontWeight: 'bold'}}>{title}</h2>
      <IndexLink to='/' activeClassName='link-active'>Go Home</IndexLink>
      <Link to='/r/birdsforscale' style={{margin: '0 10px'}} activeClassName='link-active'>BirdsForScale</Link>
      <Link to='/r/AskReddit' activeClassName='link-active'>AskReddit</Link>
      <Link to='/r/funny' activeClassName='link-active'>Funny</Link>
      <Link to='/r/gifs' activeClassName='link-active'>Gifs</Link>
    </div>
  );
}

Header.defaultProps = {
  title: 'I am a React App',
};

export default Header;
