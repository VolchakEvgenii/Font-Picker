(function () {
    'use strict';

    angular
        .module('app.config', [
            'ngMaterial',
            'restangular',
            'ui.router',
            'LocalStorageModule',
            'ngMessages',
            'ui.tinymce',
            'ngSanitize'
        ])
        .config(appConfig)
        .constant('keys', {
            googleFonts: 'AIzaSyD5XbiYbY4uGqrGbNh819SgtO0vPH0Yq4o'
        })
        .constant('api', {
            url: 'https://reqres.in/'
        })
        .run(runAppConfig);

    appConfig.$inject = [
        '$mdThemingProvider',
        'localStorageServiceProvider',
        '$locationProvider'
    ];

    function appConfig($mdThemingProvider, localStorageServiceProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        localStorageServiceProvider.setPrefix('font-picker');

        $mdThemingProvider.definePalette('font-picker', {
            '50': 'f5fae9',
            '100': 'e7f2c7',
            '200': 'd7eaa2',
            '300': 'c6e27c',
            '400': 'badb60',
            '500': 'aed544',
            '600': 'a7d03e',
            '700': '9dca35',
            '800': '94c42d',
            '900': '84ba1f',
            'A100': 'fafff2',
            'A200': 'e7ffbf',
            'A400': 'd4ff8c',
            'A700': 'cbff73',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('font-picker')
            .accentPalette('brown');
    }

    function runAppConfig(Restangular, api) {
        Restangular.setBaseUrl(api.url);
    }
})();
