(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('NotificationsList', notificationsList);

    notificationsList.$inject = ['notifications', 'Notification'];
    /* @ngInject */
    function notificationsList(notifications, Notification) {

        function NotificationsList() {
            this.data = [];
            this.isLoadInProcess = false;
            this.allLoaded = false;
        }



        NotificationsList.prototype.add = function(item, unshift) {
            var newItem = new Notification(item);
            if (unshift) {
                this.data.unshift(newItem);
            } else {
                this.data.push(newItem);
            }
        };

        NotificationsList.prototype.addList = function(itemsList) {
            var _this = this;

            if (!itemsList.length) {
                this.allLoaded = true;
            }

            _.each(itemsList, function(elem) {
                _this.add(elem);
            });
        };


        NotificationsList.prototype.getRemote = function() {
            if (this.allLoaded || this.isLoadInProcess) { return false; }
            var _this = this;

            this.isLoadInProcess = true;
            return notifications.getAll()
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };

        return NotificationsList;
    }
})();