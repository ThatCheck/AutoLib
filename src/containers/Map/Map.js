import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Label, Tabs, Tab, Button} from 'react-bootstrap';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import GoogleMap from 'google-map-react';
import {list, isLoaded} from 'redux/modules/station';
import {list as listCar, isLoaded as isLoadedCar, updatePosition} from 'redux/modules/car';
import {Marker, SearchBox} from 'components';
import { Scrollbars } from 'react-custom-scrollbars';
import jQuery from 'jquery';
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
@connect(state => ({user: state.auth.user, client: state.client, station: state.station, car: state.car}), {pushState, updatePosition})
export default class Map extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    station: PropTypes.object,
    car: PropTypes.object
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
    console.log(CarsMarkers);
    console.log(Markers);
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
                    <SearchBox label="Lieu de départ"/>
                    <SearchBox label="Lieu d'arrivé"/>
                    <Button className="pull-right" bsStyle="success">Calculer un itinéraire</Button>
                  </div>
                </Tab>
              </Tabs>
          </div>
        </div>
      </BodyClassName>
    );
  }
}
