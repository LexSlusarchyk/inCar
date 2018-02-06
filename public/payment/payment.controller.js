(function () {
'use strict';
angular
	.module('lnd')
	.controller('PaymentController', PaymentController)

	PaymentController.$inject = ['$stateParams', '$state', 'eventsService', 'confirmService'];

	function PaymentController($stateParams, $state, eventsService, confirmService) {
		var vm = this;
		var ticketId = parseInt($stateParams.ticketId);

		activate();

		function activate() {
			getTicketData();
		}

		function getTicketData() {
			eventsService.getTicket(ticketId).then(function(data) {
				vm.ticket = data.data;
				eventsService.getEvent(vm.ticket.eventId).then(function(data) {
					vm.event = data.data;
					confirmService.openRulesConfirmModal('rules').then(function(response){
						if (!response) {
							$state.go('home');
						}
					});
				});
			});
		}
	}
})();