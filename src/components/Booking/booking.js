import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Input, Label, Tabs, Tab, Button} from 'react-bootstrap';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import GoogleMap from 'google-map-react';
import {list, isLoaded} from 'redux/modules/station';
import {add} from 'redux/modules/booking';
import {list as listCar, isLoaded as isLoadedCar} from 'redux/modules/car';
import {found} from 'redux/modules/maps';
import {Marker, SearchBox} from 'components';
import { Scrollbars } from 'react-custom-scrollbars';
import {reduxForm} from 'redux-form';
import DateTimeField from 'react-bootstrap-datetimepicker';
import LaddaButton from 'react-ladda';
import NotificationSystem from 'react-notification-system';

@reduxForm({
  form: 'booking',
  fields: ['client', 'vehicule', 'dateDebut', 'dateFin']
})
@connect(state => ({user: state.auth.user, client: state.client, station: state.station, borne: state.borne, booking: state.booking}), {add})
export default class Booking extends Component {

  static propTypes = {
    client: PropTypes.object,
    station: PropTypes.object,
    borne: PropTypes.object,
    booking: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    idSelectedStation: PropTypes.number,
    fields: PropTypes.object,
    add: PropTypes.func,
    values: PropTypes.object,
    notificationSystem: PropTypes.object,
    close: PropTypes.func
  };

  constructor() {
    super();
  }

  onSubmit(values, dispatch) {
    console.log(this.props.values);
    return new Promise((resolve, reject) => {
      return this.props.add(this.props.values.vehicule, this.props.values.client, moment(Number(this.props.values.dateDebut)).format(), moment(Number(this.props.values.dateFin)).format()).then((body) => {
        this.props.notificationSystem.addNotification({
          message: 'Votre réservation à bien été prise en compte',
          level: 'success'
        });
        this.props.close();
        resolve();
      });
    });
  }

  render() {
    const {fields, handleSubmit} = this.props;
    const clientsItems = this.props.client.clients.map((client, index) => (
       <option value={client.idClient}>{client.prenom} {client.nom}</option>
    ));

    const stationItems = this.props.station.stations.map((station, index) => (
      <option value={station.idStation} selected={this.props.idSelectedStation === station.idStation ? 'selected' : null}>{station.numero} {station.adresse} {station.ville}</option>
    ));
    const selectedStation = this.props.idSelectedStation;
    const filtered = this.props.borne.bornes.filter(function filter(obj) {
      return obj.get('station') === selectedStation;
    });
    const carsItems = filtered.map((car, index) => (
      <option value={car.idVehicule} disabled={car.etatBorne === true ? 'disabled' : ''}>{car.idBorne}</option>
    ));
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Input type="select" label="Selectionner un client" {...fields.client}>
          {clientsItems}
        </Input>
        <Input type="select" label="Selectionner une station">
          {stationItems}
        </Input>
        <Input type="select" label="Selectionner une voiture" {...fields.vehicule}>
          {carsItems}
        </Input>
        <DateTimeField {...fields.dateDebut}/>
        <DateTimeField className="m-t-md" {...fields.dateFin}/>
        <LaddaButton loading={this.props.booking.loading} buttonStyle="expand-right" className="btn btn-primary block full-width m-t-md">
          Reserver
        </LaddaButton>
      </form>
    );
  }
}
