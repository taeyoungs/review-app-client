import React from 'react';
import Header from './Header';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'Routes/Home';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
