import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import Vue from 'vue/dist/vue.esm'
window.Vue = Vue;


import snet from './snet';

window.$net = snet;

import './cms';
