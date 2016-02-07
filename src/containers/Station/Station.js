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
import {list, isLoaded} from 'redux/modules/station';
import {list as listCar, isLoaded as isLoadedCar, updatePosition} from 'redux/modules/car';
import {list as listClient, isLoaded as isLoadedClient} from 'redux/modules/client';
import {list as listBorne, isLoaded as isLoadedBorne} from 'redux/modules/borne';
import {list as listBooking, isLoaded as isLoadedBooking} from 'redux/modules/booking';
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

  if (!isLoadedCar(getState())) {
    promises.push(dispatch(listCar()));
  }

  if (!isLoadedBorne(getState())) {
    promises.push(dispatch(listBorne()));
  }

  if (!isLoadedClient(getState())) {
    promises.push(dispatch(listClient()));
  }

  if (!isLoadedBooking(getState())) {
    promises.push(dispatch(listBooking()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(state => ({user: state.auth.user, client: state.client, borne: state.borne, station: state.station, car: state.car, maps: state.maps}), {pushState})
export default class Station extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    station: PropTypes.object,
    car: PropTypes.object,
    maps: PropTypes.object,
    params: PropTypes.object,
    borne: PropTypes.object
  };

  constructor() {
    super();
  }

  _handleClick(id) {
    this.props.pushState(null, '/dashboard/station/' + id.toString());
  }
  render() {
    const {params} = this.props;
    const station = this.props.station.stations.find(function findStationId(obj) {
      return obj.get('idStation') === Number(params.stationId);
    });
    const borne = this.props.borne.bornes.filter(function filterByStation(obj) {
      return obj.get('station') === Number(params.stationId);
    });

    const borneWithCars = this.props.borne.bornes.filter(function filterByEtatStation(obj) {
      return obj.get('etatBorne') === false && obj.get('station') === Number(params.stationId);
    });

    const borneWithoutCars = this.props.borne.bornes.filter(function filterByEtatStationFalse(obj) {
      return obj.get('etatBorne') === true && obj.get('station') === Number(params.stationId);
    });

    const borneRendering = borneWithCars.concat(borneWithoutCars).map((borneRender, index) => (
      <div className="col-lg-6">
        <div className="widget lazur-bg p-xl">
          <h2>
            ID : {borneRender.idBorne}
          </h2>
          <ul className="list-unstyled m-t-md">
            <li>
              <span className="fa fa-car m-r-xs"></span>
              <label>Etat: </label>
              {borneRender.etatBorne === false ? ' Libre' : ' Utilisé'}
            </li>
          </ul>
        </div>
      </div>
    ));
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row m-b-lg m-t-lg">
          <div className="col-md-6">
            <div className="profile-image">
              <img src="http://www.saemes.fr/sites/default/files/vl_electrique_0.png" className="img-circle circle-border m-b-md" alt="profile" />
            </div>
            <div className="profile-info">
              <div className="">
                <div>
                  <h2 className="no-margins">
                    ID de la station : {station.idStation}
                  </h2>
                  <h4>
                    <ul className="list-unstyled m-t-md">
                      <li>
                        <span className="fa fa-location-arrow m-r-xs"></span>
                        <label>Adresse: </label>
                        {station.numero} {station.adresse} {station.code_postal}
                      </li>
                      <li>
                        <span className="fa fa-map-marker m-r-xs"></span>
                        <label>Coordonnées: </label> <br />
                        <ul>
                          <li>Latitude: {station.latitude}</li>
                          <li>Longitude: {station.longitude}</li>
                        </ul>
                      </li>
                    </ul>
                  </h4>
                  <small>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <table className="table small m-b-xs">
              <tbody>
              <tr>
                <td>
                  <strong>{borne.length}</strong> Nombre de borne
                </td>
                <td>
                  <strong>{borneWithCars.length}</strong> Nombre de places libres
                </td>
                <td>
                  <strong>{borneWithoutCars.length}</strong> Nombre de places non libres
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          {borneRendering}
        </div>
      </div>
    );
  }
}
