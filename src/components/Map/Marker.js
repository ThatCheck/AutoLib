import React, { Component, PropTypes } from 'react';
import {greatPlaceStyle, carStyle} from './Marker_Style.js';

export default class Marker extends Component {

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    text: '',
    type: 'station'
  };

  constructor() {
    super();
  }

  render() {
    const style = this.props.type === 'station' ? greatPlaceStyle : carStyle;
    return (
      <div style={style}>
        {this.props.text}
      </div>
    );
  }
}
