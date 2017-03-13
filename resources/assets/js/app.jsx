
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

ReactDOM.render(
  element,
  document.getElementById('app')
);
