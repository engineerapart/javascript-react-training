import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Homepage from './Homepage';
import Subreddit from './Subreddit';

function Login(props) {
  return (
    <div>Please log in</div>
  );
}

function RootComp(props) {
  console.log('Has children? ', props.hasOwnProperty('children'));
  debugger;
  return (
  <div>
    I am a rootComp
    {props.children}
  </div>
  );
}

function SomeComponent(props) {
  return <RootComp>
    <div>
      <p>Hello World</p>
      <span>Some other text</span>
    </div>
  </RootComp>;
}

function Thread() {
  return null;
}

export default (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Homepage} />
        <Route path='login' component={Login} />
        <Route path='question' component={SomeComponent} />
        <Route path='posts' component={Subreddit}>
          <Route path=':id' component={Thread} />
        </Route>
      </Route>
    </Router>
  );