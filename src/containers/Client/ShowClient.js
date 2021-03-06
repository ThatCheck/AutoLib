import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';
import lodash from 'lodash';

@connect(state => ({user: state.auth.user, client: state.client}), {pushState})
export default class ShowClient extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    client: PropTypes.object,
    params: PropTypes.object
  };
  constructor() {
    super();
  }
  render() {
    const {params} = this.props;
    const client = this.props.client.clients.find(function findUserId(obj) {
      return obj.get('idClient') === Number(params.userId);
    });
    const allArray = client.utilises.concat(client.reservations);
    allArray.sort(function sort(a1, b1) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b1.createdAt) - new Date(a1.createdAt);
    });
    console.log(allArray);
    const result = allArray.map((data, index) => (
      <div className="vertical-timeline-block">
        <div className="vertical-timeline-icon navy-bg">
          <i className="fa fa-briefcase"></i>
        </div>
        <div className="vertical-timeline-content">
          <h2>{data.borne_depart === undefined ? 'Reservation' : 'Utilisation'}</h2>
          <span className="vertical-date"> {moment(data.createdAt).format('LL')} </span>
        </div>
      </div>
    ));
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row m-b-lg m-t-lg">
          <div className="col-md-6">
            <div className="profile-image">
              <img src="http://www.lumineers.me/images/core/profile-image-zabadnesterling.gif" className="img-circle circle-border m-b-md" alt="profile" />
            </div>
            <div className="profile-info">
              <div className="">
                <div>
                  <h2 className="no-margins">
                    {client.nom} {client.prenom}
                  </h2>
                  <h4>{moment(client.date_naissance).format('LL')}</h4>
                  <small>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <table className="table small m-b-xs">
              <tbody>
              <tr>
                <td>
                  <strong>{client.reservations.length}</strong> <FormattedMessage id="dashboard.show.client.number_booking"/>
                </td>
                <td>
                  <strong>{client.utilises.length}</strong> <FormattedMessage id="dashboard.show.client.number_use"/>
                </td>

              </tr>
              <tr>
                <td>
                  <strong>61</strong> <FormattedMessage id="dashboard.show.client.distance_done"/>
                </td>
                <td>
                  <strong>54</strong> <FormattedMessage id="dashboard.show.client.price"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="" id="ibox-content">
          <div id="vertical-timeline" className="vertical-container light-timeline center-orientation">
            {result}
          </div>
        </div>
      </div>
    );
  }
}
