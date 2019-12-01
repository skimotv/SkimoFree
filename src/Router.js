'use strict';

import $ from 'jquery';
import {MaterialUtils} from './Utils';
import page from 'page';

export default class Router {
  constructor() {
    this.pagesElements = $('[id^=page-]');
    const loadComponents = import(/* webpackPrefetch: true */ './async-loaded-components');
    const showSkimo = async (skimoId) => (await loadComponents).skimoPage.loadSkimos(skimoId);
    page('/skimo/:skimoId', (context) => {showSkimo(context.params.skimoId); this.displayPage('skimo');});
    page('*', () => page('/'));
    page();
  }

  async displayPage(pageId, onlyAuthed) {
    this.pagesElements.each((index, element) => {
      if (element.id === 'page-' + pageId) {
        $(element).show();
      } else if (element.id === 'page-splash' && onlyAuthed) {
        $(element).fadeOut(1000);
      } else {
        $(element).hide();
      }
    });
  }

};
