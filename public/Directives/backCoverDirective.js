(function () {
    'use strict';

    angular
        .module('lnd')
        .directive('backCover', backCover);

    function backCover() {
        return function(scope, element, attrs){
            var url = attrs.backCover;

            element.css({
                'background-image': 'url(' + url +')'
            });
        };
    }

})();
