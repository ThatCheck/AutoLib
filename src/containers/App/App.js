import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import DocumentMeta from 'react-document-meta';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import {loadAuthCookie} from 'redux/modules/auth';

function fetchData(getState, dispatch) {
  bindActionCreators({loadAuthCookie}, dispatch).loadAuthCookie();
}
@connectData(fetchData)
@connect( state => ({user: state.auth.user}), {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (this.props.user) {
      this.props.pushState(null, '/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/dashboard');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
  }

  render() {
    const styles = require('./App.scss');
    return (
      <div>
        <DocumentMeta {...config.app}/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
