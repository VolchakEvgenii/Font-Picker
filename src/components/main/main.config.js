(function () {
    'use strict';

    angular
        .module('app.main', [])
        .config(mainConfig);

    mainConfig.$inject = [
        '$stateProvider'
    ];

    function mainConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: 'components/main/main.template.html',
                controller: 'MainController as vm'
            });
    }
})();
