import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {bsStyle} from 'utils/bsValidator.js';
import {Sidebar, Topbar} from 'components';

@connect(state => ({user: state.auth.user}), {pushState})
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };
  constructor() {
    super();
  }
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="page-wrapper" className="gray-bg">
          <Topbar />
            {this.props.children}
        </div>
      </div>
    );
  }
}
