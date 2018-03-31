(function() {
    'use strict';

    angular
        .module('lnd')
        .factory('translateService', translateService);

    translateService.$inject = ['$rootScope'];
    /* @ngInject */
    function translateService($rootScope) {

        var service = {
            data: {
                lang: {}
            },
            setLang: setLang,
            changeLang: changeLang
        };


        var ruLang = {
            nav: {
                events: "ивенты",
                news: "новости",
                contact: "контакты",
                profile: "профиль",
                about: "о нас",
                signIn: "вход",
                signOut: "выйти"
            },
            home: {
                lastEvents: "последние ивенты",
                lastNews: "новости"
            },
            smartNav: {
                category: "выберете категорию",
                location: "выберите регион"
            },
            news: {
                allNews: "Все новости"
            }
        };

        var enLang = {
            nav: {
                events: "Events",
                news: "News",
                contact: "Contact Us",
                profile: "Profile",
                about: "About",
                signIn: "Sign In",
                signOut: "Sign Out"
            },
            home: {
                lastEvents: "latest events",
                lastNews: "news"
            },
            smartNav: {
                category: "select category",
                location: "select location"
            },
            news: {
                allNews: "All news"
            }
        };

        setDefaultLang();

        return service;


        function getLocalStorageData() {
            var storedData = JSON.parse(localStorage.getItem('lang'));
            console.log(storedData);
            var lang = storedData ? storedData : null;
            return lang;
        }

        function setDefaultLang() {
            var userLang = getLocalStorageData();
            if(userLang){
                setLang(userLang);
            } else {
                localStorage.setItem('lang', JSON.stringify('EN'));
                service.data.lang = enLang;
            }
        }


        function changeLang(lang) {
            setLang(lang);
        }

        function setLang(lang) {

            switch (lang) {
                case 'RU':
                    localStorage.setItem('lang', JSON.stringify(lang));
                    service.data.lang = ruLang;
                    $rootScope.$emit('lang-changed');
                    break;
                case 'EN':
                    localStorage.setItem('lang', JSON.stringify(lang));
                    service.data.lang = enLang;
                    $rootScope.$emit('lang-changed');
                    break;
                default:
                    alert( 'Я таких значень не знаю' );
            }
        }



    }
})();