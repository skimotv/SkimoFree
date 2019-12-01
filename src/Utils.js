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

  static clearTextField(element) {
    element.value = '';
    element.parentElement.MaterialTextfield.boundUpdateClassesHandler();
  }

  static upgradeTextFields(element) {
    componentHandler.upgradeElements($('.mdl-textfield', element).get());
  }

  static upgradeDropdowns(element) {
    if (element) {
      componentHandler.upgradeElements($('.mdl-js-button', element).get());
      componentHandler.upgradeElements($('.mdl-js-menu', element).get());
    } else {
      componentHandler.upgradeDom();
    }
  }

  static onEndScroll(offset = 0) {
    const resolver = new $.Deferred();
    const mdlLayoutElement = $('.mdl-layout');
    mdlLayoutElement.scroll(() => {
      if ((window.innerHeight + mdlLayoutElement.scrollTop() + offset) >=
          mdlLayoutElement.prop('scrollHeight')) {
        console.log('Scroll End Reached!');
        mdlLayoutElement.unbind('scroll');
        resolver.resolve();
      }
    });
    console.log('Now watching for Scroll End.');
    return resolver.promise();
  }

  static stopOnEndScrolls() {
    const mdlLayoutElement = $('.mdl-layout');
    mdlLayoutElement.unbind('scroll');
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

  // Returns an array of all the hashtags in the given string.
  static getHashtags(text) {
    const hashtags = [];
    text.replace(/#/g, ' #').split(/[^a-z0-9#_-]+/i).forEach((word) => {
      if (word.startsWith('#')) {
        hashtags.push(word.substring(1).toLowerCase());
      }
    });
    return hashtags;
  }
}
