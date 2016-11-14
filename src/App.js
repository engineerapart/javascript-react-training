import React, { Component } from 'react';
import PostItem from './PostItem';
import redditClient from 'api/redditClient';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    redditClient().getSubreddit({subreddit: 'birdsforscale'})
      .then(console.log, console.log)
      .catch(console.log);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="app-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="app-intro">
          This is some extra information.
        </p>
        <PostItem />
      </div>
    );
  }
}

export default App;
