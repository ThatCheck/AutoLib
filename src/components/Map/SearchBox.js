/* global google */
import React from 'react';
import ReactDom from 'react-dom';
import {Input} from 'react-bootstrap';

export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func,
    label: React.PropTypes.string
  }
  componentDidMount() {
    const input = ReactDom.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input); // no-undef
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
  onPlacesChanged = () => {
    console.log(this.searchBox);
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }
  render() {
    return (
      <div className="form-group">
      <label>{this.props.label}</label>
      <input className="" ref="input" {...this.props} type="text" className="form-control"/>
    </div>
    );
  }
}
