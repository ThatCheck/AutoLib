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
import {list as listBooking, isLoaded as isLoadedBooking} from 'redux/modules/booking';
import {FormattedMessage} from 'react-intl';

function fetchData(getState, dispatch) {
  const promises = [];

  if (!isLoaded(getState())) {
    promises.push(dispatch(list()));
  }

  if (!isLoadedBooking(getState())) {
    promises.push(dispatch(listBooking()));
  }

  return Promise.all(promises);
}
@connectData(fetchData)
@connect(state => ({user: state.auth.user, userData: state.users, booking: state.booking }), {pushState})
export default class HomeDashboard extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    userData: PropTypes.object,
    booking: PropTypes.object
  };

  constructor() {
    super();
  }
  render() {
    const {userData, booking} = this.props;
    return (
      <div className="row border-bottom white-bg dashboard-header">
          <h2><FormattedMessage id="dashboard.home.title"/></h2>
        <div className="col-sm-12">
          <div className="flot-chart dashboard-chart">
            <div className="flot-chart-content" id="flot-dashboard-chart"></div>
          </div>
          <div className="row text-left">
            <div className="col-xs-4 text-center">
              <div className=" m-l-md">
                <span className="h4 font-bold m-t block">{userData.users.length}</span>
                <small className="text-muted m-b block"><FormattedMessage id="dashboard.home.number_user"/></small>
              </div>
            </div>
            <div className="col-xs-4 text-center">
              <span className="h4 font-bold m-t block">{booking.bookings.length}</span>
              <small className="text-muted m-b block"><FormattedMessage id="dashboard.home.number_booking"/></small>
            </div>
            <div className="col-xs-4 text-center">
              <span className="h4 font-bold m-t block">$ 16,822</span>
              <small className="text-muted m-b block">Half-year revenue margin</small>
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
