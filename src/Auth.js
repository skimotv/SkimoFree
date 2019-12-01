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

    this.configureFirebaseUi();
    this.updateAll.click(() => this.updateAllAccounts());

    this.auth.onAuthStateChanged((user) => this.onAuthStateChanged(user));
  }

  configureFirebaseUi() {
    let signInFlow = 'popup';
    if (('standalone' in window.navigator)
        && window.navigator.standalone) {
      signInFlow = 'redirect';
    }

    this.uiConfig = {
      'signInFlow': signInFlow,
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      'callbacks': {
        'uiShown': function() {
          const intervalId = setInterval(() => {
            const IDPButtons = $('.firebaseui-idp-button');
            const nbIDPButtonDisplayed = IDPButtons.length;
            if (nbIDPButtonDisplayed > 0) {
              clearInterval(intervalId);
              if (!$('#fp-pre-consent').is(':checked')) {
                IDPButtons.attr('disabled', 'disabled');
              }
            }
          }, 1);
        },
      },
    };
    this.firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

};
