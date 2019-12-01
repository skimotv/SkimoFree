'use strict';

import firebase from 'firebase/app';
import 'firebase/messaging';
import firebaseConfig from './firebase-config.json';

// Configure Firebase.
firebase.initializeApp(firebaseConfig.result);

// Load Firebase messaging
firebase.messaging();
