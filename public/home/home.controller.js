(function () {
	'use strict';

	angular
		.module('lnd')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$rootScope', 'adsService', 'eventsService', 'translateService'];
	/* @ngInject */
	function HomeController($rootScope, adsService, eventsService, translateService) {
		var vm = this;
        vm.home = translateService.data.lang['home'];


		activate();

		function activate() {
            //
			// adsService.getMainAd().then(function(response) {
			// 	vm.mainAudio = response.data;
			// });
			eventsService.getLastEvents().then(function(response) {
				vm.maxLength = 3;

                vm.tempEvents = response.data;
                eventsService.getFixedEvents().then(function(response) {
                    if(response.data.length < 8) {
                        vm.events = response.data.concat(vm.tempEvents).slice(0, 8);
                        // console.log(vm.events);
                    } else {
                        vm.events = response.data;
                    }
                });

			});

			// newsService.getLastNews().then(function(response) {
			// 	vm.news = response.data;
			// });
		}
        $rootScope.$on('lang-changed', function() {
            vm.home = translateService.data.lang['home'];
        });
	}
})();