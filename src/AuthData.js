'use strict';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthData {
  constructor(firebaseHelper, privacySettings) {
    this.firebaseHelper = firebaseHelper;
    this.privacySettings = privacySettings;

    this.auth = firebase.auth();

    this.uploadButton = $('button#add');
    this.mobileUploadButton = $('button#add-floating');

    this.auth.onAuthStateChanged((user) => this.onAuthStateChanged(user));
  }

  async onAuthStateChanged(user) {
    if (user) {
      this.firebaseHelper.updatePublicProfile();
      const snapshot = await this.firebaseHelper.getPrivacySettings(user.uid);
      const settings = snapshot.val();
      if (!settings) {
        this.privacySettings.showPrivacyDialog();
      } else if (settings.content === true) {
        this.uploadButton.prop('disabled', false);
        this.mobileUploadButton.prop('disabled', false);
      }
    }
  }
};
