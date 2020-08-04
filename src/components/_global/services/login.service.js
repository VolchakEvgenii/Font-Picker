(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('loginService', loginService);
    loginService.$inject = ['Restangular'];

    function loginService(Restangular) {
        return {
            api: Restangular.service('api'),
            login: function (options) {
                return this.api.one('login').customPOST(options).then(function (data) {
                    return data;
                }, function (error) {
                    return error.data;
                });
            }
        };
    }
})();
