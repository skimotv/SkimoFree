'use strict';

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from "firebaseui"
import Router from './Router';
import page from 'page';
import {Utils} from './Utils';

export default class Auth {
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

  constructor() {
    this.auth = firebase.auth();
    this._waitForAuthPromiseResolver = new $.Deferred();
    const signedInUserContainer = $('.fp-signed-in-user-container');
  }


};
