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
