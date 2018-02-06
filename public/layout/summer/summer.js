(function() {
    'use strict';

    angular
        .module('lnd')
        .directive('summer', summer);

    summer.$inject = [];
    /* @ngInject */
    function summer() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SummerController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: '/layout/summer/summer.html',
            scope: {
                text: '='
            }
        };

        return directive;
    }

    SummerController.$inject = ['mediaService'];
    /* @ngInject */

    function SummerController(mediaService) {
        var vm = this;

        vm.options = {
            height: 500,
            focus: true,

            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                // ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['insert', ['link','picture','video','hr', 'table']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
        };

        vm.onImageUploaded = onImageUploaded;
        vm.onPaste = onPaste;



        function onImageUploaded(file) {
            var reader  = new FileReader();
            reader.onloadend = function () {
                mediaService.uploadBase64Image(reader.result).then(function(data){
                    $('#summernote').summernote('insertImage', data.data.imageUrl);
                })
            };
            reader.readAsDataURL(file[0]);
        }

        function onPaste(e) {
            console.log(e);
        }



        var triggerInput = function() {
            $('#photo-input').click();
        };

        var onFile = function(file) {
            cropperService.openCropper(file, 1, 500).then(function(data){
                $('#photo-input').val(null);
                $scope.event.imageUrl = data;
            });
        };
    }

})();
