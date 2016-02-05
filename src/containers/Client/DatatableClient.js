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

  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({user: state.auth.user, client: state.client }), {pushState})
export default class DatatableClient extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
  };

  constructor() {
    super();
  }

  _handleClick(id) {
    this.props.pushState(null, '/dashboard/clients/' + id.toString());
  }
  render() {
    const clientsData = this.props.client.clients.map((clientMap, index) => (
      <div className="col-lg-6" onClick={this._handleClick.bind(this, clientMap.idClient)}>
        <div className="widget lazur-bg p-xl">
          <h2>
            {clientMap.nom} {clientMap.prenom}
          </h2>
          <ul className="list-unstyled m-t-md">
            <li>
              <span className="fa fa-birthday-cake m-r-xs"></span>
              <label>Anniversaire: </label>
              {moment(clientMap.date_naissance).format('LL')}
            </li>
            <li>
              <span className="fa fa-star m-r-xs"></span>
              <label>Date de création: </label>
              {moment(clientMap.createdAt).format('LL')}
            </li>
          </ul>
        </div>
      </div>
    ));
    return (
      <BodyClassName>
        <div className="wrapper wrapper-content animated fadeInRight">
          {clientsData}
        </div>
      </BodyClassName>
    );
  }
}
