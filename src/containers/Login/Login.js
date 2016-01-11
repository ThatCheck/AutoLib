import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input, Alert} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {login, LOGIN_FAIL} from 'redux/modules/auth';
import {bsStyle} from 'utils/bsValidator.js';
import validator from './validator/LoginValidator';
import LaddaButton from 'react-ladda';

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: validator
})
@connect(state => ({user: state.auth}), {pushState, login})
export default class Login extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    login: PropTypes.func,
    values: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.displayAlert = this.displayAlert.bind(this);
  }

  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      return this.props.login(this.props.values.email, this.props.values.password);
    });
  }

  displayAlert() {
    console.log(this.props.user);
    if (this.props.user.loginError !== undefined) {
      return <Alert bsStyle="danger"> <strong>Une erreur c'est produite!</strong> Le couple email/mot de passe est invalide. </Alert>;
    }
  }

  render() {
    const { fields, handleSubmit, user } = this.props;
    return (
      <BodyClassName className="gray-bg">
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <h1 className="logo-name">A+</h1>
            </div>
            <h3>Bienvenue sur AutoLib+</h3>
            <p>Vous êtes à deux pas de profiter un maximun de l'expérience autolib
            </p>
            {this.displayAlert()}
            <form className="m-t" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Input
                type="email"
                placeholder="Entrer votre email"
                hasFeedback
                {...fields.email}
                bsStyle={bsStyle(fields.email)}/>
              <Input
                type="password"
                placeholder="Entrer votre mot de passe"
                hasFeedback
                {...fields.password}
                bsStyle={bsStyle(fields.password)}/>
              <LaddaButton loading={user.loggingIn} buttonStyle="expand-right" className="btn btn-primary block full-width m-b">
                Login
              </LaddaButton>
              <a href="#"><small>Mot de passe oublie ?</small></a>
              <p className="text-muted text-center"><small>Vous n'avez pas de compte?</small></p>
              <a className="btn btn-sm btn-white btn-block" href="/register">Créer un compte</a>
            </form>
          </div>
        </div>
      </BodyClassName>
  );
  }
}
