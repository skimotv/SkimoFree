'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import latinize from 'latinize';

export default class FirebaseHelper {
  static get POSTS_PAGE_SIZE() {
    return 3;
  }

  static get USER_PAGE_POSTS_PAGE_SIZE() {
    return 6;
  }


  static get HASHTAG_PAGE_POSTS_PAGE_SIZE() {
    return 9;
  }

  static get COMMENTS_PAGE_SIZE() {
    return 3;
  }


  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth();
    this.firebaseRefs = [];
  }


};
