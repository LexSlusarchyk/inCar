(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('profile', {
			    url:'/profile/:id',
			    templateUrl: 'profile/profile.html',
			    controller: 'ProfileController',
			    controllerAs: 'vm'
			})
	}])
})();