'use strict';

import firebase from 'firebase/app';
import 'firebase/messaging';
import firebaseConfig from './firebase-config.json';
firebase.initializeApp(firebaseConfig.result);
firebase.messaging();
