(function () {
'use strict';
angular
	.module('lnd')
	.controller('EventController', EventController)

	EventController.$inject = ['$scope', '$stateParams', 'eventsService'];

	function EventController($scope, $stateParams, eventsService) {
		var vm = this;
		var eventId = parseInt($stateParams.id);
		eventsService.getEvent(eventId).then(function(data) {
			vm.event = data.data;
		})
	}
})()