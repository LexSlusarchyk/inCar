(function () {
    'use strict';
    angular
        .module('lnd')
        .controller('DashboardNewsController', DashboardNewsController);

    DashboardNewsController.$inject = ['$stateParams', 'geographyService', 'newsService', 'modalService', 'confirmService'];

    function DashboardNewsController($stateParams, geographyService, newsService, modalService, confirmService) {
        var vm = this;

        vm.showAddCategoryModal = showAddCategoryModal;
        vm.showEditCategoryModal = showEditCategoryModal;
        vm.showDeleteCategoryModal = showDeleteCategoryModal;
        vm.showDeleteArticleModal = showDeleteArticleModal;

        activate();

        function activate() {
            getLocations();
            getNewsCategories();
            getNews();
        }

        function getLocations() {
            geographyService.getLocations().then(function(data) {
                vm.locations = data.data;
            });
        }

        function getNewsCategories() {
            newsService.getCategories().then(function(data) {
                vm.newsCats = data.data;
            });
        }

        function getNews() {
            newsService.getNews().then(function(data) {
                vm.news = data.data;
            })
        }

        function showAddCategoryModal() {
            modalService.showAddNewsCatModal().then(function(response){
                if (response) {
                    getNewsCategories();
                }
            })
        }

        function showEditCategoryModal(newsCategory) {
            modalService.showEditNewsCatModal(newsCategory).then(function(response){
                if (response) {
                    getNewsCategories();
                }
            })
        }

        function showDeleteArticleModal(article) {
            var message = "Are you sure you want to delete this category?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    newsService.deleteArticle(article.id).then(function(data){
                        getNews();
                    });
                }
            });
        }

        function showDeleteCategoryModal(category) {
            var message = "Are you sure you want to delete this category?";
            confirmService.openConfirmModal(message).then(function(response){
                if (response) {
                    newsService.deleteCategory(category.id).then(function(data){
                        getNewsCategories();
                    });
                }
            });
        }



    }
})();


