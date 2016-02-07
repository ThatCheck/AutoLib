import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import {bindActionCreators} from 'redux';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import {list, isLoaded} from 'redux/modules/client';
import {list as listStation, isLoaded as isLoadedStation} from 'redux/modules/station';
import {FormattedMessage} from 'react-intl';
import Griddle from 'griddle-react';
import {ClientLinkComponent, DateComponent} from 'components';
import moment from 'moment';
import randomColor from 'utils/random-color';

function fetchData(getState, dispatch) {
  const promises = [];

  if (!isLoaded(getState())) {
    promises.push(dispatch(list()));
  }

  if (!isLoadedStation(getState())) {
    promises.push(dispatch(listStation()));
  }

  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({user: state.auth.user, client: state.client, station: state.station }), {pushState})
export default class StationDatatables extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    station: PropTypes.object
  };

  constructor() {
    super();
  }

  _handleClick(id) {
    this.props.pushState(null, '/dashboard/stations/' + id.toString());
  }
  render() {
    const stationData = this.props.station.stations.map((station, index) => (
      <div className="col-lg-6" onClick={this._handleClick.bind(this, station.idStation)}>
        <div className="widget lazur-bg p-xl">
          <h2>
            ID : {station.idStation}
          </h2>
          <ul className="list-unstyled m-t-md">
            <li>
              <span className="fa fa-location-arrow m-r-xs"></span>
              <label>Adresse: </label>
              {station.numero} {station.adresse} {station.code_postal}
            </li>
            <li>
              <span className="fa fa-map-marker m-r-xs"></span>
              <label>Coordonnées: </label> <br />
              Latitude: {station.latitude}<br />
              Longitude: {station.longitude}<br />
            </li>
          </ul>
        </div>
      </div>
    ));
    return (
      <BodyClassName>
        <div className="wrapper wrapper-content animated fadeInRight">
          {stationData}
        </div>
      </BodyClassName>
    );
  }
}
