(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('apiService', apiService);
    apiService.$inject = ['Restangular', '$http'];

    function apiService(Restangular, $http) {
        return {
            api: Restangular.service('api'),

            fontsGET: function () {
                return $http({
                    method: 'GET',
                    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD5XbiYbY4uGqrGbNh819SgtO0vPH0Yq4o'
                }).then(
                    function success(data) {
                        return data;
                    },
                    function error(error) {
                        return error;
                    }
                );
            },
        };
    }
})();
