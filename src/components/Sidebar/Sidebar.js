import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Dropdown, MenuItem} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {LinkContainer} from 'react-router-bootstrap';

@connect(state => ({user: state.auth.user}), {pushState})
export default class Sidebar extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  constructor() {
    super();
  }

  render() {
    const {user} = this.props;
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{user.first_name} {user.last_name}</strong> </span></span>
                </a>
              </div>
              <div className="logo-element">
                IN+
              </div>
            </li>
            <li className="active">
              <LinkContainer to="/dashboard">
                <a><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span></a>
              </LinkContainer>
            </li>
            <li>
              <LinkContainer to="/dashboard/clients">
                <a><i className="fa fa-users"></i> <span className="nav-label">Clients</span></a>
              </LinkContainer>
            </li>
            <li>
              <LinkContainer to="/dashboard/map">
                <a><i className="fa fa-map"></i> <span className="nav-label">Map</span></a>
              </LinkContainer>
            </li>
            <li>
              <a href="#"><i className="fa fa-bar-chart-o"></i> <span className="nav-label">Graphs</span><span className="fa arrow"></span></a>
              <ul className="nav nav-second-level collapse">
                <li><a href="graph_flot.html">Flot Charts</a></li>
                <li><a href="graph_morris.html">Morris.js Charts</a></li>
                <li><a href="graph_rickshaw.html">Rickshaw Charts</a></li>
                <li><a href="graph_chartjs.html">Chart.js</a></li>
                <li><a href="graph_chartist.html">Chartist</a></li>
                <li><a href="graph_peity.html">Peity Charts</a></li>
                <li><a href="graph_sparkline.html">Sparkline Charts</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
