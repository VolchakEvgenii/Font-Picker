(function () {
    'use strict';

    angular
        .module('app', [
            'app.config',
            'app.login',
            'app.main',
            'app.constructor',
            'app.about'
        ])
        .run(bootstrap);

    bootstrap.$inject = [
        '$location'
    ];

    function bootstrap($location) {
        $location.path('/constructor');
    }
})();
