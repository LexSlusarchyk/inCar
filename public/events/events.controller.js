(function () {
'use strict';
angular
	.module('lnd')
	.controller('EventsController', EventsController)

	EventsController.$inject = ['$scope', '$stateParams', 'eventsService', 'usersService', 'geographyService'];

	function EventsController($scope, $stateParams, eventsService, usersService, geographyService) {
		var vm = this;

		vm.catId = parseInt($stateParams.catId);
		vm.usersService = usersService;
		vm.filterFunction = filterFunction;

		if (vm.catId) {
			eventsService.getEvents(vm.catId).then(function (data) {
				vm.events = data.data;
			})
		} else {
			eventsService.getEvents().then(function (data) {
				vm.events = data.data;
			})
		}


		function filterFunction(actual) {
			var result = true;

			if (geographyService.currentCountry) {
				result = parseInt(geographyService.currentCountry) === parseInt(actual.country);
			}

			if (result && geographyService.currentRegion) {
				result = parseInt(geographyService.currentRegion) === parseInt(actual.town);
			}

			return result;
		}
	}
})();