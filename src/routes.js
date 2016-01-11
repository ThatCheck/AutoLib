import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Login,
    Register
  } from 'containers';

export default (store) => {

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
  );
};
