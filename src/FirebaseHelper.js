'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import latinize from 'latinize';

export default class FirebaseHelper {

  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth();
    this.firebaseRefs = [];
  }
};
