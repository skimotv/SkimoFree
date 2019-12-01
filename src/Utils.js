'use strict';

import $ from 'jquery';

export class MaterialUtils {
  static refreshSwitchState(element) {
    const jQuery = $;
    if (element instanceof jQuery) {
      element = element[0];
    }
    if (element.MaterialSwitch) {
      element.MaterialSwitch.checkDisabled();
      element.MaterialSwitch.checkToggleState();
    }
  }

  static closeDrawer() {
    const drawerObfuscator = $('.mdl-layout__obfuscator');
    if (drawerObfuscator.hasClass('is-visible')) {
      drawerObfuscator.click();
    }
  }


  static showSnackbar(element, data) {
    if (!element.MaterialSnackbar) {
      element = element[0];
    }
    element.MaterialSnackbar.showSnackbar(data);
  }

  static hideSnackbar(element) {
    if (!element.MaterialSnackbar) {
      element = element[0];
    }
    element.MaterialSnackbar.cleanup_();
  }
};

export class Utils {
  static startOfflineListener() {
    console.log('Starting Offline status tracker!');

    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        console.log('User is now Offline!');
        const data = {
          message: '⚡ You are offline',
          timeout: 100000000,
        };
        MaterialUtils.showSnackbar($('.mdl-js-snackbar'), data);
        $('.fp-disabled-when-offline').attr('disabled', 'disabled');
      } else{
        console.log('User is now Online!');
        MaterialUtils.hideSnackbar($('.mdl-js-snackbar'));
        $('.fp-disabled-when-offline').removeAttr('disabled');
      }
    };

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }
  /**
   * Escapes HTML characters from String.
   */
  static escapeHtml(unsafe) {
    if (!unsafe) {
      return unsafe;
    }
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

}
