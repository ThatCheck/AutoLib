import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Dropdown, MenuItem} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {LinkContainer} from 'react-router-bootstrap';

export default class ClientLinkComponent extends Component {

  static propTypes = {
    data: PropTypes.number
  };
  constructor() {
    super();
  }

  render() {
    const url = '/dashboard/clients/' + this.props.data.toString();
    return (
      <LinkContainer to={url}>
        <a>{this.props.data}</a>
      </LinkContainer>
    );
  }
}
