(function () {
	'use strict';

	angular
		.module('lnd')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['adsService', 'eventsService', 'newsService'];
	/* @ngInject */
	function HomeController(adsService, eventsService, newsService) {
		var vm = this;
		var events = null;

		activate();

		function activate() {
			adsService.getMainAd().then(function(response) {
				vm.mainAudio = response.data;
			});

            eventsService.getFixedEvents().then(function(response) {
                events = response.data;

            });

			eventsService.getLastEvents().then(function(response) {
				vm.maxLength = 3;
                vm.events = events.concat(response.data).slice(0,6);
			});

			newsService.getLastNews().then(function(response) {
				vm.news = response.data;
			});
		}
	}
})();