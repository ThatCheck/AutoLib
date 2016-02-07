import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import {bindActionCreators} from 'redux';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {bsStyle} from 'utils/bsValidator.js';
import connectData from 'helpers/connectData';
import {list, isLoaded} from 'redux/modules/user';
import {list as listStation, isLoaded as isLoadedStation} from 'redux/modules/station';
import {list as listCar, isLoaded as isLoadedCar, updatePosition} from 'redux/modules/car';
import {list as listClient, isLoaded as isLoadedClient} from 'redux/modules/client';
import {list as listBorne, isLoaded as isLoadedBorne} from 'redux/modules/borne';
import {list as listBooking, isLoaded as isLoadedBooking} from 'redux/modules/booking';
import {list as listUse, isLoaded as isLoadedUse} from 'redux/modules/use';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';

function fetchData(getState, dispatch) {
  const promises = [];

  if (!isLoaded(getState())) {
    promises.push(dispatch(list()));
  }
  if (!isLoadedStation(getState())) {
    promises.push(dispatch(listStation()));
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

  if (!isLoadedUse(getState())) {
    promises.push(dispatch(listUse()));
  }
  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({user: state.auth.user, userData: state.users, booking: state.booking, station: state.station, client: state.client, car: state.car, borne: state.borne, use: state.use }), {pushState})
export default class HomeDashboard extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    userData: PropTypes.object,
    booking: PropTypes.object,
    client: PropTypes.object,
    car: PropTypes.object,
    borne: PropTypes.object,
    station: PropTypes.object,
    use: PropTypes.object,
  };

  constructor() {
    super();
  }
  render() {
    const useData = this.props.use.inUse.map((use, index) => (
      <tr>
        <td>
          <span className="label label-success">En cours</span>
        </td>
        <td>
          <i className="fa fa-clock-o"></i> {moment(use.createdAt).format('LL')}</td>
        <td>{use.Vehicule}</td>
      </tr>
    ));

    const bookingData = this.props.booking.bookings.map((booking, index) => (
      <tr>
        <td>
          { moment(booking.createdAt) > moment() ? <span className="label label-success">En attente</span> : <span className="label label-primary">Utilisé</span> }
        </td>
        <td>
          <i className="fa fa-clock-o"></i> {moment(booking.createdAt).format('LL')}</td>
        <td>{booking.vehicule}</td>
      </tr>
    ));
    return (
      <div className="">
        <div className="row">
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-user fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_client"/> </span>
                  <h2 className="font-bold">{this.props.client.clients.length}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-home fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_stations"/> </span>
                  <h2 className="font-bold">{this.props.station.stations.length}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-plug fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_borne"/> </span>
                  <h2 className="font-bold">{this.props.borne.bornes.length}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-automobile fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_cars"/> </span>
                  <h2 className="font-bold">{this.props.car.cars.length}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-calendar fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_booking"/> </span>
                  <h2 className="font-bold">{this.props.booking.bookings.length}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget style1 navy-bg">
              <div className="row">
                <div className="col-xs-4">
                  <i className="fa fa-fire fa-5x"></i>
                </div>
                <div className="col-xs-8 text-right">
                  <span> <FormattedMessage id="dashboard.home.number_in_use"/> </span>
                  <h2 className="font-bold">{this.props.use.inUse.length}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5><FormattedMessage id="dashboard.home.last_use"/></h5>
              </div>
              <div className="ibox-content">
                <table className="table table-hover no-margins">
                  <thead>
                  <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Vehicule</th>
                  </tr>
                  </thead>
                  <tbody>
                  {useData}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5><FormattedMessage id="dashboard.home.last_use"/></h5>
              </div>
              <div className="ibox-content">
                <table className="table table-hover no-margins">
                  <thead>
                  <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Vehicule</th>
                  </tr>
                  </thead>
                  <tbody>
                  {bookingData}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/**
 * Created by Cabbibi on 11/01/2016.
 */
