(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('events', {
			    url:'/events/:catId',
			    templateUrl: 'events/events.html',
			    controller: 'EventsController',
				controllerAs: 'vm'
			})
	}])
})();



