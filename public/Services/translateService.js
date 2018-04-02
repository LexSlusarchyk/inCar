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
            changeLang: changeLang,
            getLocalStorageData: getLocalStorageData
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
                backgroundMain: "content/images/backgroundMainRU.jpg",
                backgroundMain2: "content/images/backgroundMain2RU.jpg",
                lastEvents: "последние ивенты",
                lastNews: "новости"
            },
            smartNav: {
                category: "выберете категорию",
                location: "выберите регион",
                logIn: "войти"
            },
            news: {
                allNews: "Все новости"
            },
            profile: {
                signIn: "войти",
                signOut: "Выйти",
                editProfile: "Редактировать профиль",
                edit: "Редактировать",
                yourEmail: "введите ваш email",
                firstName: "Имя",
                lastName: "Фамилия",
                password: "пароль",
                yourPassword: "введите ваш пароль",
                confirmPasswordHere: "подтверждения пароля",
                passwordConfirmaiton: "введите ваш пароль повторно",
                gender: "Пол",
                male: "Мужской",
                female: "Женский",
                age: "Возраст",
                address: "место нахождения (включая страну)",
                xboxUsername: "профиль XBOX",
                psUsername: "профиль PS4",
                steamUsername: "профиль Steam",
                showEvents: "Показивать ивенты в",
                yearsOld: "мне больше 18 лет",
                signUp: "зарегистрироваться"
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
                backgroundMain: "content/images/backgroundMainEN.jpg",
                backgroundMain2: "content/images/backgroundMain2EN.jpg",
                lastEvents: "latest events",
                lastNews: "news"
            },
            smartNav: {
                category: "select category",
                location: "select location",
                logIn: "log in"
            },
            news: {
                allNews: "All news"
            },
            profile: {
                signIn: "login",
                signOut: "Sign Out",
                editProfile: "edit profile",
                edit: "Edit",
                yourEmail: "your email here",
                password: "password",
                yourPassword: "your password",
                confirmPasswordHere: "confirm password here",
                passwordConfirmaiton: "password confirmaiton",
                gender: "Gender",
                male: "Male",
                female: "Female",
                age: "Age",
                address: "Physical address (including country)",
                xboxUsername: "XBOX username",
                psUsername: "PS4 username",
                steamUsername: "Steam username",
                showEvents: "Show events in",
                yearsOld: "I'm more than 18 years old",
                signUp: "sign up"
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
                    console.log("lang changed to RU");
                    break;
                case 'EN':
                    localStorage.setItem('lang', JSON.stringify(lang));
                    service.data.lang = enLang;
                    $rootScope.$emit('lang-changed');
                    console.log("lang changed to EN");
                    break;
                default:
                    alert( 'Я таких значень не знаю' );
            }
        }



    }
})();