import React from 'react';
import Header from './Header';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'Routes/Home';
import Review from 'Routes/Review';
import Search from 'Routes/Search';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/review" exact component={Review}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
