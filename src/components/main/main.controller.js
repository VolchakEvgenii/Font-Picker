(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$mdSidenav'
    ];

    function MainController($mdSidenav) {
        var vm = this;

        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }
    }
})();
