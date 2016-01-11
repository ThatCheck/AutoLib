import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import BodyClassName from 'react-body-classname';

export default class Login extends Component {
  render() {
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
            <form className="m-t" role="form" action="index.html">
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Username" required=""/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" required=""/>
              </div>
              <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

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
