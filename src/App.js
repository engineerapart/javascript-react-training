import React, { Component } from 'react';
import PostItem from './PostItem';
import redditClient from 'api/redditClient';

import logo from './logo.svg';
import './App.css';

function createPostItem(item) {
  const { data } = item;
  const props = {
    title: data.title,
    thumbUrl: data.thumbnail,
    voteCount: data.ups,
    commentCount: data.num_comments,
    createdDate: data.created_utc,
    createdBy: data.author,
    subreddit: data.subreddit,
    threadId: data.name,
    key: data.name,
  };

  return <PostItem {...props} />
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      myName: 'magic',
      chava: 'is cool',
    }
  }

  componentDidMount() {
    redditClient().getSubreddit({subreddit: 'birdsforscale'})
      .then(({json}) => {
        console.log(json);
        const { data: { children: redditPosts }} = json;
        this.setState({posts: redditPosts});
      }, console.log)
      .catch(console.log);
  }

  render() {
    const { posts } = this.state;

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
        {posts.map(createPostItem)}
      </div>
    );
  }
}

export default App;
