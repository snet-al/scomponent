require('@webcomponents/webcomponentsjs/webcomponents-bundle.js');
require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');

import jquery from 'jquery';
window.$ = jquery;

import vue from 'vue';
window.Vue = vue

//import bootstrap from 'bootstrap';
window.test = function(param)  { console.log(1); }

 alert(1);
 window.addEventListener('WebComponentsReady', function() {
  // show body now that everything is ready
  alert('web ready');
  var newDrawer = document.createElement('app-drawer');
  // Add it to the page
  document.body.appendChild(newDrawer);
  // Attach event listeners
  document.querySelector('app-drawer').addEventListener('open', function() {
    alert('el')
  });
});
 $(function(){
    alert('edhe jquery eshte ok');

  // Create with javascript
  var newDrawer = document.createElement('app-drawer');
  // Add it to the page
  document.body.appendChild(newDrawer);
  // Attach event listeners
  document.querySelector('app-drawer').addEventListener('open', function() {
    alert('el')
  });
 });