(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('Notification', notification);

    notification.$inject = ['notifications'];
    /* @ngInject */
    function notification(notifications) {
        function Notification(params) {
            this.id = null;
            this.title = '';
            this.text = '';

            this.init(params);
        }

        Notification.prototype.init = function(params) {
            if (!params) { return false; }

            if (params.id) { this.id = params.id; }
            if (params.title) { this.title = params.title; }
            if (params.text) { this.text = params.text; }
            if (params.isActive) { this.isActive = true; }
        };

        Notification.prototype.getData = function() {
            var data = {
                title: this.title,
                text: this.text,
                isActive: this.isActive
            };

            if (this.id) {
                data.id = this.id;
            }

            return data;
        };

        Notification.prototype.create = function() {
            return notifications.create(this.getData());
        };

        Notification.prototype.update = function() {
            return notifications.edit(this.getData());
        };

        Notification.prototype.getRemote = function() {
            var _this = this;
            return notifications.getById(this.id).then(function(response) {
                _this.init(response.data);
            });
        };

        Notification.prototype.remove = function() {
            return notifications.remove(this.id);
        };

        return Notification;
    }
})();