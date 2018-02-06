'use strict';

// Declare app level module which depends on views, and components
angular.module('lnd', [
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'summernote',
  'ngCropper',
  'ngStorage'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}]);


