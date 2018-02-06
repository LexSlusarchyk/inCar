'use strict';

angular.module('lnd')
.directive('slide', [ '$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      var menuButton = elem.find('.slide-menu-button');
      var searchButton = elem.find('.slide-search-button');
      var eventsButton = elem.find('.menu-button-events');



      menuButton.on( "click", function(event) {
        event.stopPropagation();
        elem.toggleClass('menu-active');
      });

      eventsButton.on( "click", function(event) {
        event.stopPropagation();
        elem.toggleClass('menu-active');
      });

      searchButton.on( "click", function(event) {
        event.stopPropagation();
        elem.toggleClass('search-active');
      });

      $('.overlay').click(function() {
        elem.removeClass('menu-active search-active');
      });
      
    }
  };
}])