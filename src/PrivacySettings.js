'use strict';

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import Router from './Router';

export default class PrivacySettings {
  constructor(firebaseHelper) {
    this.firebaseHelper = firebaseHelper;

    this.privacyDialogButton = $('.privacy-dialog-link');
    this.privacyDialog = $('#privacy-dialog');
    this.privacyDialogSave = $('.privacy-save');
    this.allowDataProcessing = $('#allow-data');
    this.allowContent = $('#allow-content');
    this.allowSocial = $('#allow-social');

    this.privacyDialogButton.click(() => this.showPrivacyDialog());
    this.privacyDialogSave.click(() => this.savePrivacySettings());
    this.allowDataProcessing.change(() => this.toggleSubmitStates());
  }

  showPrivacyDialog() {
    this.initializePrivacySettings();
    if (window.dialogPolyfill && !this.privacyDialog.get(0).showModal) {
      window.dialogPolyfill.registerDialog(this.privacyDialog.get(0));
    }
    this.privacyDialog.get(0).showModal();
  }

  toggleSubmitStates() {
    if (this.allowDataProcessing.is(':checked')) {
      this.privacyDialogSave.removeAttr('disabled');
    } else {
      this.privacyDialogSave.attr('disabled', true);
    }
  }

  async initializePrivacySettings() {
    const uid = firebase.auth().currentUser.uid;
    if (this.savedPrivacySettings === undefined) {
      const snapshot = await this.firebaseHelper.getPrivacySettings(uid);
      this.savedPrivacySettings = snapshot.val();
      if (this.savedPrivacySettings) {
        if (this.savedPrivacySettings.data_processing) {
          this.allowDataProcessing.prop('checked', true);
          this.privacyDialogSave.removeAttr('disabled');
        }
        if (this.savedPrivacySettings.content) {
          this.allowContent.prop('checked', true);
        }
        if (this.savedPrivacySettings.social) {
          this.allowSocial.prop('checked', true);
        }
      }
    }
  }

  savePrivacySettings() {
    const uid = firebase.auth().currentUser.uid;
    const settings = {
      data_processing: this.allowDataProcessing.prop('checked'),
      content: this.allowContent.prop('checked'),
      social: this.allowSocial.prop('checked'),
    };

    this.firebaseHelper.setPrivacySettings(uid, settings);
    if (!settings.social) {
      this.firebaseHelper.removeFromSearch(uid);
    }
    this.privacyDialog.get(0).close();
    Router.reloadPage();
  }

}
