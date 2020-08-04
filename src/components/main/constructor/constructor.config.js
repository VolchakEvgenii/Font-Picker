(function () {
    'use strict';

    angular
        .module('app.constructor', [])
        .config(constructorConfig);

    constructorConfig.$inject = [
        '$stateProvider'
    ];

    function constructorConfig($stateProvider) {
        $stateProvider
            .state('main.constructor', {
                url: 'constructor',
                views: {
                    'main': {
                        templateUrl: 'components/main/constructor/constructor.template.html',
                        controller: 'ConstructorController as vm'
                    }
                },
            });
    }
})();
