import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Dropdown, MenuItem} from 'react-bootstrap';
import { pushState } from 'redux-router';

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
    console.log(user);
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
              <a href="index.html"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboards</span> <span className="fa arrow"></span></a>
              <ul className="nav nav-second-level">
                <li><a href="index.html">Dashboard v.1</a></li>
                <li className="active"><a href="dashboard_2.html">Dashboard v.2</a></li>
                <li><a href="dashboard_3.html">Dashboard v.3</a></li>
                <li><a href="dashboard_4_1.html">Dashboard v.4</a></li>
                <li><a href="dashboard_5.html">Dashboard v.5 <span className="label label-primary pull-right">NEW</span></a></li>
              </ul>
            </li>
            <li>
              <a href="layouts.html"><i className="fa fa-diamond"></i> <span className="nav-label">Layouts</span></a>
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
