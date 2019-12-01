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
    this.signedInUserAvatar = $('.fp-avatar', signedInUserContainer);
    this.signedInUsername = $('.fp-username', signedInUserContainer);
    this.signOutButton = $('.fp-sign-out');
    this.deleteAccountButton = $('.fp-delete-account');
    this.usernameLink = $('.fp-usernamelink');
    this.updateAll = $('.fp-update-all');
    this.uploadButton = $('button#add');
    this.mobileUploadButton = $('button#add-floating');
    this.preConsentCheckbox = $('#fp-pre-consent');

    this.configureFirebaseUi();

    this.preConsentCheckbox.change(() => {
      const checked = this.preConsentCheckbox.is(':checked');
      const IDPButtons = $('.firebaseui-idp-button');
      if (checked) {
        IDPButtons.removeAttr('disabled');
      } else {
        IDPButtons.attr('disabled', 'disabled');
      }
    });
    this.signOutButton.click(() => this.auth.signOut());
    this.deleteAccountButton.click(() => this.deleteAccount());
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

  onAuthStateChanged(user) {
    if (this._waitForAuthPromiseResolver.state() !== 'pending' || user) {
      Router.reloadPage();
    }

    this._waitForAuthPromiseResolver.resolve();
    document.body.classList.remove('fp-auth-state-unknown');
    if (!user) {
      this.userId = null;
      this.signedInUserAvatar.css('background-image', '');
      this.firebaseUi.start('#firebaseui-auth-container', this.uiConfig);
      document.body.classList.remove('fp-signed-in');
      document.body.classList.add('fp-signed-out');
      Auth.disableAdminMode();
    } else {
      this.toggleAdminMode();
      document.body.classList.remove('fp-signed-out');
      document.body.classList.add('fp-signed-in');
      this.userId = user.uid;
      this.signedInUsername.text(user.displayName || 'Anonymous');
      this.usernameLink.attr('href', `/user/${user.uid}`);
    }
  }

  async toggleAdminMode() {
    try {
      const idToken = await this.auth.currentUser.getIdToken();
      const isAdmin = JSON.parse(window.atob(idToken.split('.')[1])).admin;
      if (isAdmin) {
        Auth.enableAdminMode();
      } else {
        Auth.disableAdminMode();
      }
    } catch (e) {
      console.error('Error while checking for Admin priviledges', e);
      Auth.disableAdminMode();
    }
  }

  static enableAdminMode() {
    document.body.classList.add('fp-admin');
  }

  static disableAdminMode() {
    document.body.classList.remove('fp-admin');
  }

  async deleteAccount() {
    try {
      await this.auth.currentUser.delete();
      window.alert('Account deleted');
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        window.alert('You need to have recently signed-in to delete your account.\n' +
            'Please sign-in and try again.');
        this.auth.signOut();
        page('/');
      }
    }
  }
};
