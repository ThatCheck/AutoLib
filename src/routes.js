import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Login,
    Register,
    Dashboard,
    HomeDashboard,
    DatatableClient,
    ShowClient,
    Map,
    StationDatatables,
    Station,
    Car
  } from 'containers';

export default (store) => {

  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <Route path="/dashboard" onEnter={requireLogin} component={Dashboard}>
        <IndexRoute component={HomeDashboard}/>
        <Route path="clients" component={DatatableClient}/>
        <Route path="clients/:userId" component={ShowClient}/>
        <Route path="stations" component={StationDatatables}/>
        <Route path="stations/:stationId" component={Station}/>
        <Route path="map" component={Map}/>
        <Route path="cars" component={Car}/>
      </Route>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
  );
};
