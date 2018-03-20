(function () {
	'use strict';

	angular
		.module('lnd')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['adsService', 'eventsService', 'newsService'];
	/* @ngInject */
	function HomeController(adsService, eventsService, newsService) {
		var vm = this;


		activate();

		function activate() {

			adsService.getMainAd().then(function(response) {
				vm.mainAudio = response.data;
			});

			eventsService.getLastEvents().then(function(response) {
				vm.maxLength = 3;

                vm.events = response.data;
                eventsService.getFixedEvents().then(function(response) {
                    if(response.data.length < 6) {
                        vm.events = response.data.concat(vm.events).slice(0, 6);
                    } else {
                        vm.events = response.data;
                    }
                });
			});
			
			newsService.getLastNews().then(function(response) {
				vm.news = response.data;
			});
		}
	}
})();