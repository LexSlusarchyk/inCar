(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('tickets', {
			    url:'/tickets',
			    templateUrl: 'tickets/tickets.html',
			    controller: 'TicketsController',
			    controllerAs: 'vm'
			})
	}])
})();