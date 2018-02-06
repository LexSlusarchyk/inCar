(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('editprofile', {
			    url:'/editprofile/:id',
			    templateUrl: 'profile/edit/edit-profile.html',
			    controller: 'EditProfileController',
			    controllerAs: 'vm'
			})
	}])
})();