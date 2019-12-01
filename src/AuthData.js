'use strict';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthData {
  constructor(firebaseHelper, privacySettings) {
    this.firebaseHelper = firebaseHelper;
    this.privacySettings = privacySettings;
    this.auth = firebase.auth();
  }

};
