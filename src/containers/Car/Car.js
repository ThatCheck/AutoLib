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
import {list as listCar, isLoaded as isLoadedCar} from 'redux/modules/car';
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

  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({user: state.auth.user, client: state.client, car: state.car }), {pushState})
export default class StationDatatables extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    car: PropTypes.object
  };

  constructor() {
    super();
  }
  render() {
    const carData = this.props.car.cars.map((car, index) => (
      <div className="col-lg-6">
        <div className="widget style1 lazur-bg">
          <div className="row">
            <div className="col-xs-4">
              <i className="fa fa-battery-full fa-5x"></i>
            </div>
            <div className="col-xs-8 text-right">
              <span> Voiture n°{car.idVehicule} </span>
              <h2 className="font-bold">{car.Disponibilite}</h2>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <BodyClassName>
        <div className="wrapper wrapper-content animated fadeInRight clearfix">
          {carData}
        </div>
      </BodyClassName>
    );
  }
}
