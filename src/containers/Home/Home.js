import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import {LinkContainer} from 'react-router-bootstrap';

export default class Home extends Component {
  render() {
    const laptopImage = require('./laptop.png');
    return (
    <div className="landing-page" style={{backgroundColor: '#fff'}}>
      <div className="navbar-wrapper">
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header page-scroll">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <LinkContainer to="/dashboard/map">
                    <a className="page-scroll" href="#page-top">Reserver</a>
                  </LinkContainer>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div id="inSlider" className="carousel carousel-fade" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <div className="container">
              <div className="carousel-caption">
                <h1>AutoLib + <br/>
                  Conduisez,<br/>
                  Economisez<br/>
                  Soyez Ecologique</h1>
                <p>Le tout nouveau système de conduite de Lyon.</p>
              </div>
              <div className="carousel-image wow zoomIn">
              </div>
            </div>
            <div className="header-back one"></div>

          </div>
          <div className="item">
            <div className="container">
              <div className="carousel-caption blank">
                <h1>Complétement gratuit</h1>
                <p>Le service est complétement gratuit lors de votre inscription.</p>
              </div>
            </div>
            <div className="header-back two"></div>
          </div>
        </div>
      </div>
      <section id="features" className="container services">
        <div className="row">
          <div className="col-sm-3">
            <h2>Complétement</h2>
            <p>Le service est complétement gratuit lors de votre inscription</p>
          </div>
          <div className="col-sm-3">
            <h2>Pensez Ecologie</h2>
            <p>Les voitures sont toutes des voitures électriques. Vous ne polluez donc pas.</p>
          </div>
          <div className="col-sm-3">
            <h2>Economisez</h2>
            <p>Aucun frais à la location et on ne facture que les kilomètres roulés.</p>
            <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
          </div>
          <div className="col-sm-3">
            <h2>Une ergonomie sans faille</h2>
            <p>Doté des dernières technologies de developpement web, AutoLib+ vous promet une user-experience incroyable.</p>
            <p><a className="navy-link" href="#" role="button">Details &raquo;</a></p>
          </div>
        </div>
      </section>

      <section className="container features">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="navy-line"></div>
            <h1>AutoLib+<br/> <span className="navy"> La conduite de l'avenir</span> </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 text-center wow fadeInLeft">
            <div>
              <i className="fa fa-mobile features-icon"></i>
              <h2>Complétement responsive</h2>
              <p>Le site s'adapte automatique à votre device.</p>
            </div>
            <div className="m-t-lg">
              <i className="fa fa-bar-chart features-icon"></i>
              <h2>Un suivi</h2>
              <p>Grâce à AutoLib, vous pouvez, à tous moment suivre votre voiture sur l'application.</p>
            </div>
          </div>
          <div className="col-md-6 text-center  wow zoomIn">
            <img src="img/landing/perspective.png" alt="dashboard" className="img-responsive"/>
          </div>
          <div className="col-md-3 text-center wow fadeInRight">
            <div>
              <i className="fa fa-envelope features-icon"></i>
              <h2>Possibilité de reserver</h2>
              <p>Sur AutoLib+ vous avez même la possibilité de réserver une voiture.</p>
            </div>
            <div className="m-t-lg">
              <i className="fa fa-cars features-icon"></i>
              <h2>Des voitures 3.0</h2>
              <p>Tout le confort nécessaire est présent dans les voitures AutoLib+.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="team" className="gray-section team">
        <div className="container">
          <div className="row m-b-lg">
            <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1>Notre équipe</h1>
              <p>Une équipe de jeunes et talentueux développeur.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 wow fadeInLeft">
              <div className="team-member">
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAbtAAAAJDk1ODgzZjg2LTRiZWUtNDJhYy04YWQ5LTJlYmFmNTYxZmYyZg.jpg" className="img-responsive img-circle img-small" alt="" />
                  <h4><span className="navy">Valentin </span> Degrange</h4>
                  <p>Résponsable de la partie mobile et du marketing. </p>
                  <ul className="list-inline social-icon">
                    <li><a href="#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="team-member wow zoomIn">
                <img style={{width: '88px'}} src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAXcAAAAJGE3MDZjZTE4LTA0NzMtNGZjNy1hY2ZiLWJlZDNlMjc1ZDZhNg.jpg" className="img-responsive img-circle" alt=""/>
                  <h4><span className="navy">Cabirol</span> Florian</h4>
                  <p>Responsable de la partie desktop/web et de l'architecture serveur.</p>
                  <ul className="list-inline social-icon">
                    <li><a href="#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="navy-section testimonials" style={{marginTop: 0}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center wow zoomIn">
              <i className="fa fa-comment big-icon"></i>
              <h1>
                Ce que disent nos utilisateurs
              </h1>
              <div className="testimonials-text">
                <i>"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."</i>
              </div>
              <small>
                <strong>12.02.2014 - Andy Smith</strong>
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
}
