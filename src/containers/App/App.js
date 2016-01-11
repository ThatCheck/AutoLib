import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {

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
