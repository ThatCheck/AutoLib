import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Dropdown, MenuItem} from 'react-bootstrap';
import { pushState } from 'redux-router';
import reactCookie from 'react-cookie';
@connect(state => ({user: state.auth.user}), {pushState})
export default class Topbar extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  constructor() {
    super();
  }

  _handleChangeLocale(language) {
    reactCookie.save('locale', language, {
      path: '/',
      maxAge: 10000000
    });
  }
  render() {
    const {user} = this.props;
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
          <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <span className="m-r-sm text-muted welcome-message"></span>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i className="fa fa-language"></i> <span className="label label-success">2</span>
              </a>
              <ul className="dropdown-menu dropdown-messages">
                <li onClick={this._handleChangeLocale.bind(this, 'fr')}>
                  FR
                </li>
                <li className="divider"></li>
                <li onClick={this._handleChangeLocale.bind(this, 'en')}>
                  EN
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                <i className="fa fa-bell"></i> <span className="label label-primary">8</span>
              </a>
              <ul className="dropdown-menu dropdown-alerts">
                <li>
                  <a href="mailbox.html">
                    <div>
                      <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                      <span className="pull-right text-muted small">4 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="profile.html">
                    <div>
                      <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                      <span className="pull-right text-muted small">12 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="grid_options.html">
                    <div>
                      <i className="fa fa-upload fa-fw"></i> Server Rebooted
                      <span className="pull-right text-muted small">4 minutes ago</span>
                    </div>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <div className="text-center link-block">
                    <a href="notifications.html">
                      <strong>See All Alerts</strong>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a className="right-sidebar-toggle">
                <i className="fa fa-tasks"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
