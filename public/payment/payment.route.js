(function(){
'use strict';

angular
	.module('lnd')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('payment', {
			    url:'/payment/:ticketId',
			    templateUrl: 'payment/payment.html',
			    controller: 'PaymentController',
			    controllerAs: 'vm'
			})
	}])
})();