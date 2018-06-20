import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import Vue from 'vue/dist/vue.esm'
window.Vue = Vue;

window.$net = require('./core').default;