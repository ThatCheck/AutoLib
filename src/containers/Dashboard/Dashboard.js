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
import {list} from 'redux/modules/car';
import {Sidebar, Topbar} from 'components';

@connect(state => ({user: state.auth.user}), {list, pushState})
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    list: PropTypes.func
  };

  constructor() {
    super();
  }

  componentDidMount() {
    if (socket) {
      socket.on('car_status', this.onMessageReceived);
    }
    document.getElementById('page-wrapper').style.position = 'relative';
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('car_status', this.onMessageReceived);
    }
  }
  onMessageReceived = (data) => {
    this.props.list();
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
