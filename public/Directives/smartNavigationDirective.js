(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('smartNavigation', smartNavigation);

    smartNavigation.$inject = [];
    /* @ngInject */
    function smartNavigation() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SmartNavigationController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'templates/smart-navigation.html',
            scope: {
                tree: '=',
                activeCat: '=?'
            }
        };

        return directive;
    }

    SmartNavigationController.$inject = ['$state', '$rootScope', '$document', 'usersService', 'geographyService', 'confirmService', 'translateService'];
    /* @ngInject */
    function SmartNavigationController($state, $rootScope, $document, usersService, geographyService, confirmService, translateService) {
        var vm = this;
        var catHistory = [];
        var wrapper = $document.find('.wrapper');

        vm.onCatClick = onCatClick;
        vm.previouslyActiveCat = undefined;
        vm.backToPreviousCat = backToPreviousCat;
        vm.goToState = goToState;
        vm.signOut = signOut;
        vm.changeLang = changeLang;
        vm.selectedLocations = [];
        vm.smartNav = translateService.data.lang['smartNav'];

        activate();

        function activate() {
            vm.userData = usersService.data;
            if (vm.userData.userData) {
                vm.isLoggedIn = true;
                if (vm.userData.userData.role === 'admin') {
                    vm.isAdmin = true;
                }
            }

            getLocations();

            $rootScope.$on('user-logged-in', function() {

                vm.userData = usersService.data;
                if (vm.userData.userData) {
                    vm.isLoggedIn = true;
                    if (vm.userData.userData.role === 'admin') {
                        vm.isAdmin = true;
                    }
                }

                getLocations();
            });

            $rootScope.$on('lang-changed', function() {
                vm.smartNav = translateService.data.lang['smartNav'];
            })
        }

        function changeLang(lang) {
            translateService.setLang(lang);
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
                setMultiselectConfig();
            });
        }

        function setMultiselectConfig() {
            var user = vm.userData.userData;

            if (!user) {
                return false;
            }

            vm.multiselectConfig = {
                propToCheck: 'id',
                preselected: [user.country, user.region],
                onBaseChange: function(country, leaveOpened) {
                    geographyService.currentCountry = country;
                    geographyService.currentRegion = null;
                    if (!leaveOpened) {
                        wrapper.removeClass('menu-active search-active');
                    }
                },
                onChildChange: function(region, leaveOpened) {
                    geographyService.currentRegion = region;
                    if (!leaveOpened) {
                        wrapper.removeClass('menu-active search-active');
                    }
                }
            }
        }

        function onCatClick(newCat) {
            if (newCat.subcats && newCat.subcats.length) {
                changeActiveCat(newCat);
            } else {
                $state.go('events', {catId: newCat.id});
                wrapper.removeClass('menu-active search-active');

            }
        }

        function goToState(state, params) {
            if (params) {
                $state.go(state, params);
            } else {
                $state.go(state);
            }
            wrapper.removeClass('menu-active search-active');
        }

        function changeActiveCat(newCat) {
            catHistory.push(vm.activeCat);
            vm.previouslyActiveCat = vm.activeCat;
            vm.activeCat = newCat.subcats;
        }

        function backToPreviousCat() {
            vm.previouslyActiveCat = catHistory[catHistory.length - 1];
            vm.activeCat = vm.previouslyActiveCat;
            catHistory.splice(catHistory.length - 1, 1);
            vm.previouslyActiveCat = catHistory[catHistory.length - 1];
        }

        function signOut() {
            var message = 'Are you sure?';

            confirmService.openConfirmModal(message).then(function(response) {
                if (response) {
                    usersService.signOut();
                    goToState('sign.in');
                }
            });
        }
    }
})();

