import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class DateComponent extends Component {

  static propTypes = {
    data: PropTypes.string
  };
  constructor() {
    super();
  }

  render() {
    return <span>{ moment(this.props.data).format('LL') }</span>;
  }
}
