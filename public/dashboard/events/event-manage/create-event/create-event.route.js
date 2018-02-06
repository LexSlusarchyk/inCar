(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.addevent', {
                    url:'/addevent/:catId',
                    templateUrl: 'dashboard/events/event-manage/event-manage.html',
                    controller: 'DashboardAddEventController',
                    controllerAs: 'vm'
                })
        }])
})();



