'use strict';

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import {MaterialUtils} from './Utils';
import page from 'page';

export default class Messaging {
  constructor(firebaseHelper) {
    this.firebaseHelper = firebaseHelper;

    this.auth = firebase.auth();
    try {
      this.messaging = firebase.messaging();
    } catch(e) {
      if (e.code === 'messaging/unsupported-browser') {
        console.warn('This Browser does not suport FCM. Notifications won\'t be available.', e);
      } else {
        throw e;
      }
    }

    this.enableNotificationsContainer = $('.fp-notifications');
    this.enableNotificationsCheckbox = $('#notifications');
    this.enableNotificationsLabel = $('.mdl-switch__label', this.enableNotificationsContainer);

    this.toast = $('.mdl-js-snackbar');

    this.enableNotificationsCheckbox.change(() => this.onEnableNotificationsChange());
    this.auth.onAuthStateChanged(() => this.trackNotificationsEnabledStatus());
    if (this.messaging) {
      this.messaging.onTokenRefresh(() => this.saveToken());
      this.messaging.onMessage((payload) => this.onMessage(payload));
    }
  }

  async saveToken() {
    try {
      const currentToken = await this.messaging.getToken();
      if (currentToken) {
        await this.firebaseHelper.saveNotificationToken(currentToken);
        console.log('Notification Token saved to database');
      } else {
        this.requestPermission();
      }
    } catch(err) {
      console.error('Unable to get messaging token.', err);
    }
  }

  async requestPermission() {
    console.log('Requesting permission...');
    try {
      await this.messaging.requestPermission();
      console.log('Notification permission granted.');
      this.saveToken();
    } catch(err) {
      console.error('Unable to get permission to notify.', err);
    }
  }

  onMessage(payload) {
    console.log('Notifications received.', payload);

    if (payload.notification) {
      const userId = payload.notification.click_action.split('/user/')[1];

      let data = {
        message: payload.notification.body,
        actionHandler: () => page(`/user/${userId}`),
        actionText: 'Profile',
        timeout: 10000,
      };
      MaterialUtils.showSnackbar(this.toast, data);
    }
  }

  onEnableNotificationsChange() {
    const checked = this.enableNotificationsCheckbox.prop('checked');
    this.enableNotificationsCheckbox.prop('disabled', true);

    return this.firebaseHelper.toggleNotificationEnabled(checked);
  }

  trackNotificationsEnabledStatus() {
    if (this.auth.currentUser) {
      this.firebaseHelper.registerToNotificationEnabledStatusUpdate((data) => {
        this.enableNotificationsCheckbox.prop('checked', data.val() !== null);
        this.enableNotificationsCheckbox.prop('disabled', false);
        this.enableNotificationsLabel.text(data.val() ? 'Notifications Enabled' : 'Enable Notifications');
        MaterialUtils.refreshSwitchState(this.enableNotificationsContainer);

        if (data.val() && this.messaging) {
          this.saveToken();
        }
      });
    }
  }
}
