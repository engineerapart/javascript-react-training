import React from 'react';
import { Link } from 'react-router';

function Homepage() {
  return (
    <div>
      <p className="app-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p className="app-intro">
        <Link to='posts'>Send me to the posts!</Link>
      </p>
    </div>
  );
}

export default Homepage;