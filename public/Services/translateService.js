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
                textFirst: "Представляем InCAR, новую гоночную платформу, которая изменит автомобильный киберспорт. Наш ресурс объединяет все самые популярный автомобильные симуляторы. Участвуйте в онлайн гонке со своими друзьями и почувствуйте дрожь в борьбе за реальные призы в одном из наших многочисленных турниров.",
                textSecound:"C нами автомобильные симуляторы выходят на новый уровень увлекательности!",
                follow: "МЫ В СОЦ.СЕТЯХ:",
                lastEvents: "ближайшие ивенты",
                lastNews: "новости"
            },
            smartNav: {
                navigation: "Навигацыя:",
                events: "ивенты",
                news: "Новости",
                contact: "Контакты",
                profile: "Профиль",
                about: "О нас",
                switchLang: "сменить язык",
                category: "выберете категорию",
                location: "выберите регион",
                logIn: "войти"
            },
            news: {
                newsHeader: "Новости",
                allNews: "Все новости"
            },
            profile: {
                profile: "ПРОФИЛЬ",
                yourEvents: "ВАШИ ИВЕНТЫ",
                signIn: "войти",
                signOut: "Выйти",
                editProfile: "Ред. профиль",
                edit: "Ред.",
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
                userSignUp: "зарегистрироваться"
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
                textFirst: "Have you ever watched Formula 1 and seen those speed demons roaring around the track at breakneck speeds so quickly even you’re getting an adrenaline rush just watching? Ever put your car to the very limit of its top speed on virtually any video game imaginable and felt that buzz of excitement beating your friends to the chequered flag and trophy at the end?",
                textSecound:"Well now that trophy could be yours for real.",
                follow: "FOLLOW US:",
                lastEvents: "latest events",
                lastNews: "news"
            },
            smartNav: {
                navigation: "Navigation:",
                events: "Events",
                news: "News",
                contact: "Contact Us",
                profile: "Profile",
                about: "About",
                switchLang: "Change language",
                category: "select category",
                location: "select location",
                logIn: "log in"
            },
            news: {
                newsHeader: "News",
                allNews: "All news"
            },
            profile: {
                profile: "PROFILE",
                yourEvents: "YOUR EVENTS",
                signIn: "login",
                signOut: "Sign Out",
                editProfile: "edit profile",
                edit: "Edit",
                yourEmail: "your email here",
                firstName: "First name",
                lastName: "Last name",
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
                userSignUp: "sign up"
            }
        };

        setDefaultLang();

        return service;


        function getLocalStorageData() {
            var storedData = JSON.parse(localStorage.getItem('lang'));
            // console.log(storedData);
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
                    // console.log("lang changed to EN");
                    break;
                default:
                    alert( 'Я таких значень не знаю' );
            }
        }



    }
})();