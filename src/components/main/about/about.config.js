(function () {
    'use strict';

    angular
        .module('app.about', [])
        .config(aboutConfig);

    aboutConfig.$inject = [
        '$stateProvider'
    ];

    function aboutConfig($stateProvider) {
        $stateProvider
            .state('main.about', {
                url: 'about',
                views: {
                    'main': {
                        templateUrl: 'components/main/about/about.template.html',
                        controller: 'AboutController as vm'
                    }
                }
            });
    }
})();
