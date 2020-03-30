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
import Detail from 'Routes/Detail';
import Collection from 'Routes/Collection';
import WriteReview from 'Routes/WriteReview';
import Mypage from 'Routes/Mypage';
import ReviewDetail from 'Routes/ReviewDetail';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/review" exact component={Review}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/movie/:id" component={Detail} />
        <Route path="/collection/:id" component={Collection} />
        <Route path="/writeReview/:id" component={WriteReview} />
        <Route path="/user/:id" component={Mypage} />
        <Route path="/review/:id" component={ReviewDetail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
