'use strict';

import $ from 'jquery';
import firebase from 'firebase/app';
import firebaseConfig from './firebase-config.json';
import Auth from './Auth';
import Router from './Router';
import 'material-design-lite';
import {Utils} from './Utils';

import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-amaranth/index.css';
import 'material-design-lite/material.min.css';
import 'firebaseui/dist/firebaseui.css';
import 'materialize-css/dist/css/materialize.min.css';
import './app.css';

firebase.initializeApp(firebaseConfig.result);
window.firebase = firebase;

$(document).ready(() => {
  const auth = new Auth();
  window.fpRouter = new Router(auth);
});

Utils.startOfflineListener();
