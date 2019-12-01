'use strict';

import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import {MaterialUtils} from './Utils';
import page from 'page';

export default class Router {
  constructor() {
    this.pagesElements = $('[id^=page-]');

    const loadComponents = import(/* webpackPrefetch: true */ './async-loaded-components');

    const showSkimo = async (skimoId) => (await loadComponents).skimoPage.loadSkimos(skimoId);

    page(Router.setLinkAsActive);

    page('/skimo/:skimoId', (context) => {showSkimo(context.params.skimoId); this.displayPage('skimo');});
    page('*', () => page('/'));

    page();
  }

  async displayPage(pageId, onlyAuthed) {
    if (onlyAuthed) {
      await this.auth.waitForAuth;
      if (!firebase.auth().currentUser) {
        return page('/');
      }
    }

    this.pagesElements.each((index, element) => {
      if (element.id === 'page-' + pageId) {
        $(element).show();
      } else if (element.id === 'page-splash' && onlyAuthed) {
        $(element).fadeOut(1000);
      } else {
        $(element).hide();
      }
    });

    MaterialUtils.closeDrawer();

    Router.scrollToTop();
  }

  redirectHomeIfSignedIn() {
    if (firebase.auth().currentUser) {
      page('/home');
    }
  }

  static reloadPage() {
    let path = window.location.pathname;
    if (path === '') {
      path = '/';
    }
    page(path);
  }

  static scrollToTop() {
    $('html,body').animate({scrollTop: 0}, 0);
  }

  static setLinkAsActive(context, next) {
    const canonicalPath = context.canonicalPath;
    if (canonicalPath === '') {
      canonicalPath = '/';
    }
    $('.is-active').removeClass('is-active');
    $(`[href="${canonicalPath}"]`).addClass('is-active');
    next();
  }
};
