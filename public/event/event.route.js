(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('event', {
			    url:'/event/:id',
			    templateUrl: 'event/event.html',
			    controller: 'EventController',
			    controllerAs: 'vm'
			})
	}])
})();