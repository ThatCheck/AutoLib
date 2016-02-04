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
  render() {
    const {client} = this.props;
    const rows = client.clients;
    const columnMeta = [
      {
        'columnName': 'idClient',
        'order': 1,
        'locked': false,
        'visible': true,
        'customComponent': ClientLinkComponent
      },
      {
        'columnName': 'date_naissance',
        'order': 4,
        'locked': false,
        'visible': true,
        'customComponent': DateComponent
      }
    ];
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5><FormattedMessage id="dashboard.manage.client.header"/></h5>
              </div>
              <div className="ibox-content">
                <Griddle results={rows} columnMetadata={columnMeta} tableClassName="table table-striped table-bordered table-hover" showFilter showSettings resultsPerPage={10} enableInfiniteScroll bodyHeight={400} columns={['idClient', 'nom', 'prenom', 'date_naissance']}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
