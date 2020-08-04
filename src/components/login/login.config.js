(function () {
    'use strict';

    angular
        .module('app.login', [])
        .config(loginConfig);

    loginConfig.$inject = [
        '$stateProvider'
    ];
    function loginConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl as vm'
            });
    }
})();
