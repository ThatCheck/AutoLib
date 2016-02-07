import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Label, Tabs, Tab, Button, Modal} from 'react-bootstrap';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import GoogleMap from 'google-map-react';
import {list, isLoaded} from 'redux/modules/station';
import {list as listCar, isLoaded as isLoadedCar, updatePosition} from 'redux/modules/car';
import {list as listClient, isLoaded as isLoadedClient} from 'redux/modules/client';
import {list as listBorne, isLoaded as isLoadedBorne} from 'redux/modules/borne';
import {list as listBooking, isLoaded as isLoadedBooking} from 'redux/modules/booking';
import {found} from 'redux/modules/maps';
import {Marker, SearchBox, Booking} from 'components';
import { Scrollbars } from 'react-custom-scrollbars';
import jQuery from 'jquery';

import NotificationSystem from 'react-notification-system';


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
@connect(state => ({user: state.auth.user, client: state.client, station: state.station, car: state.car, maps: state.maps}), {pushState, updatePosition, found})
export default class Map extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired,
    found: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    station: PropTypes.object,
    car: PropTypes.object,
    maps: PropTypes.object
  };
  constructor() {
    super();
  }

  state = {
    showCars: true,
    showStations: true,
    element: null,
    center: {lat: 45.7640430, lng: 4.8356590},
    zoom: 11,
    direction_from: null,
    direction_to: null,
    showBooking: false
  };
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
    console.log('Message received from car_status update on redis => ' + data);
    if (data === 'end') {
      return;
    }
    const dataSplit = data.split('|');
    this.props.updatePosition(dataSplit[0], dataSplit[2], dataSplit[1]);
  }

  _handleChangeCars() {
    this.setState({showCars: !this.state.showCars});
  }

  _handleChangeStations() {
    this.setState({showStations: !this.state.showStations});
  }
  _handleClickOnList(car) {
    this.setState({center: {lat: car.latitude, lng: car.longitude}});
    this.setState({zoom: 15});
  }
  _handleCallbackSearchBoxParentFrom(places) {
    this.setState({direction_from: places});
  }
  _handleCallbackSearchBoxParentTo(places) {
    this.setState({direction_to: places});
  }
  _handleButtonClick() {
    console.log(this.state.direction_from);
    console.log(this.state.direction_to[0].geometry.location.lat());
    const to = [];
    to.push(this.state.direction_to[0].geometry.location.lat());
    to.push(this.state.direction_to[0].geometry.location.lng());
    const from = [];
    from.push(this.state.direction_from[0].geometry.location.lat());
    from.push(this.state.direction_from[0].geometry.location.lng());
    this.props.found(from, to);
  }
  _handleBookingButton() {
    this.setState({showBooking: true});
  }
  _close() {
    this.setState({ showBooking: false });
  }

  toggle() {
    jQuery('.container-listings-maps').slideToggle();
  }

  render() {
    const style = require('./Map.scss');
    const Markers = this.props.station.stations && this.state.showStations &&
      this.props.station.stations.map((marker, index) => (
          <Marker
            // required props
            key={marker.get('idStation')}
            lat={marker.get('latitude')}
            lng={marker.get('longitude')}

            type="station"
           />
        ));
    const CarsMarkers = this.props.car.cars && this.state.showCars && this.props.car.cars.map((marker, index) => (
        <Marker
          // required props
          key={marker.get('idVoiture')}
          lat={marker.get('latitude')}
          lng={marker.get('longitude')}
          type="car"
        />
      ));
    const liCars = this.props.car.cars.map((car, index) => (
      <div className="media border-bottom" onClick={this._handleClickOnList.bind(this, car)}>
        <div className="media-body">
          <h4 className="media-heading">Numéro véhicule : {car.idVehicule}</h4> <span className="pull-right">{ car.Disponibilite === 'LIBRE' ? <Label bsStyle="success">Libre</Label> : <Label bsStyle="error">En utilisation</Label> }</span>
          <p>
            Longitude : {car.longitude} <br />
            Latitude : {car.latitude}
          </p>
        </div>
      </div>
    ));
    return (
      <BodyClassName className="full-height-layout">
        <div className="wrapper wrapper-content animated fadeInRight" style={{height: 'calc(100% - 61px)', position: 'absolute', margin: '0', padding: '0', marginLeft: '-15px', width: '100%'}}>
            <GoogleMap center={this.state.center} zoom={this.state.zoom}>
              {this.state.showStations === true ? Markers : []}
              {this.state.showCars === true ? CarsMarkers : []}
            </GoogleMap>
          <NotificationSystem ref="notificationSystem" />
          <div className={style.filter}>
              <Tabs defaultActiveKey={2}>
                <Tab eventKey={1} title="Vue Général">
                  <Input type="checkbox" label="Voir toutes les stations." onChange={this._handleChangeStations.bind(this)} checked={this.state.showStations === true ? 'checked' : null}/>
                  <Input type="checkbox" label="Voir toutes les voitures." onChange={this._handleChangeCars.bind(this)} checked={this.state.showCars === true ? 'checked' : null}/>
                  <div className={style['list-container']}>
                    <FormattedMessage id="dashboard.map.see_all"/> <span className="fa fa-caret-down pull-right slideToggle-listings-maps" style={{paddingTop: '5px'}} onClick={this.toggle.bind(this)}/>
                    <Scrollbars className="container-listings-maps" style={{ height: 500 }}>
                      {liCars}
                    </Scrollbars>
                  </div>
                </Tab>
                <Tab eventKey={2} title="Itinéraire">
                  <div className="m-t-sm">
                    <SearchBox label="Lieu de départ" parentCallback={this._handleCallbackSearchBoxParentFrom.bind(this)}/>
                    <SearchBox label="Lieu d'arrivé" parentCallback={this._handleCallbackSearchBoxParentTo.bind(this)}/>
                    <Button className="pull-right" bsStyle="success" onClick={this._handleButtonClick.bind(this)}>Calculer un itinéraire</Button>
                    {
                      this.props.maps.from !== null ? (
                      <div className="clearfix m-t-xl">
                        <h2>Possibilité de prendre une voiture Autolib</h2> Depuis <br /> <b>{this.props.maps.from.Station.numero} {this.props.maps.from.Station.adresse} {this.props.maps.from.Station.ville}</b> <br/> A <br /><b>{this.props.maps.to.Station.numero} {this.props.maps.to.Station.adresse} {this.props.maps.to.Station.ville}</b>

                        <Button className="pull-right m-t-sm" bsStyle="primary" style={{width: '100%'}} onClick={this._handleBookingButton.bind(this)}>Réserver</Button>
                      </div>
                    ) : null }
                  </div>
                </Tab>
              </Tabs>
          </div>
          <Modal show={this.state.showBooking} onHide={this._close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Faire une réservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Booking close={this._close.bind(this)} notificationSystem={this.refs.notificationSystem} idSelectedStation={this.props.maps.from && this.props.maps.from.Station.idStation}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this._close.bind(this)}>Fermer</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </BodyClassName>
    );
  }
}
