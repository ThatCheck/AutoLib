import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {Input} from 'react-bootstrap';
import { pushState } from 'redux-router';
import {register, STATE} from 'redux/modules/register';
import {bsStyle} from 'utils/bsValidator.js';
import validator from './validator/RegisterValidator';
import ERROR_CODE from 'utils/ERROR_CODE.js';
import {transformSequelizeValidationError} from 'utils/front-utils.js';

@reduxForm({
  form: 'register',
  fields: ['email', 'first_name', 'last_name', 'password', 'confirmPassword'],
  validate: validator
})
@connect(state => ({register: state.register}), {pushState, register})
export default class Register extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    register: PropTypes.func,
    values: PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      return this.props.register(this.props.values.email, this.props.values.last_name, this.props.values.first_name, this.props.values.password, this.props.values.confirmPassword).then(
        (body) => {
          if (STATE.REGISTER_SUCCESS === body.type) {
            this.props.pushState(null, '/login');
            resolve();
          } else if (STATE.REGISTER_FAIL === body.type) {
            if (body.error.message === ERROR_CODE.SEQUELIZE_VALIDATION_ERROR) {
              console.log(body.error);
              const data = transformSequelizeValidationError(body.error.errors);
              console.log(data);
              reject(data);
            }
          }
        });
    });
  }

  render() {
    const { fields, handleSubmit } = this.props;
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
            <form className="m-t" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Input
                type="email"
                placeholder="Entrer votre email"
                help={fields.email.error}
                hasFeedback
                {...fields.email}
                bsStyle={bsStyle(fields.email)}/>
              <Input
                type="text"
                placeholder="Entrer votre nom"
                hasFeedback
                bsStyle={bsStyle(fields.first_name)}
                {...fields.first_name}/>
              <Input
                type="text"
                placeholder="Enter votre prénom"
                hasFeedback
                bsStyle={bsStyle(fields.last_name)}
                {...fields.last_name}/>
              <Input
                type="password"
                placeholder="Entrer votre mot de passe"
                hasFeedback
                {...fields.password}
                bsStyle={bsStyle(fields.password)}/>
              <Input
                type="password"
                placeholder="Entrer votre mot de passe"
                hasFeedback
                {...fields.confirmPassword}
                bsStyle={bsStyle(fields.confirmPassword)}/>

                <button type="submit" className="btn btn-primary block full-width m-b">S'enregistrer</button>

                <p className="text-muted text-center"><small>Vous avez déjà un compte?</small></p>
                <a className="btn btn-sm btn-white btn-block" href="/login">Login</a>
            </form>
          </div>
        </div>
      </BodyClassName>
    );
  }
}
