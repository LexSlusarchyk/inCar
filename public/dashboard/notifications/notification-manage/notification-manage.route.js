(function(){
    'use strict';

    angular
        .module('lnd')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.notifications-manage', {
                    url:'/notifications-manage?id',
                    templateUrl: 'dashboard/notifications/notification-manage/notification-manage.html',
                    controller: 'DashboardNotificationsManageController',
                    controllerAs: 'vm'
                })
        }])
})();
