'use strict';

import $ from 'jquery';
export class Utils {
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
