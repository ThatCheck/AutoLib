import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {bsStyle} from 'utils/bsValidator.js';
@connect(state => ({user: state.auth.user}), {pushState})
export default class HomeDashboard extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
/**
 * Created by Cabbibi on 11/01/2016.
 */
