'use strict';

import $ from 'jquery';
import Router from './Router';
import 'material-design-lite';
import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-amaranth/index.css';
import 'material-design-lite/material.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import './app.css';


$(document).ready(() => {
  window.fpRouter = new Router();
});
